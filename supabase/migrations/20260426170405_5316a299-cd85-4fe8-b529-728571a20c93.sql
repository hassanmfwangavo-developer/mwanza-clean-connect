
-- Roles enum + table
create type public.app_role as enum ('admin', 'user');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

-- Security definer role check
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (
    select 1 from public.user_roles where user_id = _user_id and role = _role
  )
$$;

-- Booking status enum + table
create type public.booking_status as enum ('received', 'confirmed', 'in_progress', 'completed', 'cancelled');
create type public.service_type as enum ('residential', 'office', 'windows', 'garden', 'schools');

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  service service_type not null,
  size_info text not null,
  scheduled_date date not null,
  scheduled_time text not null,
  address text not null,
  notes text,
  payment_method text not null default 'pay_on_completion',
  total_price numeric(12,2) not null default 0,
  status booking_status not null default 'received',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.bookings enable row level security;

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger profiles_updated before update on public.profiles
  for each row execute function public.set_updated_at();
create trigger bookings_updated before update on public.bookings
  for each row execute function public.set_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'phone');
  insert into public.user_roles (user_id, role) values (new.id, 'user');
  return new;
end; $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- RLS: profiles
create policy "own profile select" on public.profiles for select using (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id);
create policy "admin profile select" on public.profiles for select using (public.has_role(auth.uid(), 'admin'));

-- RLS: user_roles
create policy "view own roles" on public.user_roles for select using (auth.uid() = user_id);
create policy "admin view roles" on public.user_roles for select using (public.has_role(auth.uid(), 'admin'));
create policy "admin manage roles" on public.user_roles for all using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

-- RLS: bookings
create policy "user view own bookings" on public.bookings for select using (auth.uid() = user_id);
create policy "user create own bookings" on public.bookings for insert with check (auth.uid() = user_id);
create policy "user cancel own bookings" on public.bookings for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "admin view all bookings" on public.bookings for select using (public.has_role(auth.uid(), 'admin'));
create policy "admin update all bookings" on public.bookings for update using (public.has_role(auth.uid(), 'admin'));

-- One-time admin bootstrap RPC
create or replace function public.claim_first_admin()
returns boolean language plpgsql security definer set search_path = public
as $$
declare admin_count int;
begin
  if auth.uid() is null then raise exception 'must be authenticated'; end if;
  select count(*) into admin_count from public.user_roles where role = 'admin';
  if admin_count > 0 then return false; end if;
  insert into public.user_roles (user_id, role) values (auth.uid(), 'admin')
    on conflict do nothing;
  return true;
end; $$;
