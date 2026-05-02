## Goal

Pivot the app from a Supabase-backed booking system to a fast, frontend-only **localStorage + WhatsApp** flow with premium Framer Motion animations, while keeping the existing blue/white branding and shadcn UI.

> Note on Cloud: Cloud is already enabled on this project and cannot be disconnected once added. We will simply **stop using it** — no auth, no DB calls, no edge functions. The app will work entirely client-side as you requested.

---

## 1. Routing & Auth removal

`src/App.tsx`
- Remove `AuthProvider`, `ProtectedRoute`, `Auth`, `Book`, `Checkout`, `BookingDetail`, `Admin` routes.
- New routes only:
  - `/` → `Index` (Home — hero, services, footer)
  - `/bookings` → `Bookings` (reads localStorage)
  - `/profile` → `Profile` (clear history, app info)
  - `*` → `NotFound`
- All wrapped in `Layout`.

Delete (or leave unused): `useAuth.tsx`, `ProtectedRoute.tsx`, `Auth.tsx`, `Book.tsx`, `Checkout.tsx`, `BookingDetail.tsx`, `Admin.tsx`.

## 2. Local storage layer

New `src/lib/bookings.ts`:
- `Booking` type: `{ id, serviceKey, serviceName, details, createdAt }`
- `getBookings()`, `addBooking(b)`, `clearBookings()`
- Key: `kansolele.bookings.v1`
- Emits a `storage`-style custom event so `Bookings` page updates live.

## 3. Services catalog (5 categories, Swahili-first)

Rewrite `src/lib/services.ts` to expose 5 services with image + icon + Swahili tagline:

| key | name | tagline | image |
|---|---|---|---|
| `home` | Home | Nyumba zinazokaliwa | hero-team / generated home image |
| `houses` | Houses | Baada ya ujenzi (Apartments/Hostels) | generated |
| `sheri` | Sheri | Vituo vya mafuta | generated |
| `shule` | Shule & Daycares | Usafi wa mazingira | generated |
| `vifaa` | Vifaa vya Usafi | Vifaa, sabuni na kemikali | uploaded supplies image |

Drop pricing fields (no checkout). Keep `formatTZS` only if reused; otherwise remove.

## 4. Assets

Copy uploads into `src/assets/`:
- `user-uploads://IMG-20260426-WA0032.jpg` → `src/assets/hero-team.jpg`
- `user-uploads://young-man-cleaning-windows.jpg` → `src/assets/hero-windows.jpg`
- `user-uploads://IMG-20260428-WA0021.jpg` → `src/assets/supplies.jpg`

Generate 4 service tiles via Lovable AI (nano-banana) for: home interior, post-construction apartment, petrol station, school courtyard. Save to `src/assets/svc-*.jpg`.

## 5. Dependencies

Add `framer-motion` and `react-icons` (for crisp Instagram/Facebook/TikTok brand icons — lucide lacks TikTok).

## 6. Layout / Navigation

`src/components/Layout.tsx`
- Header: hamburger removed; logo **centered**; right side keeps a single small action (link to `/bookings` bell or just empty for cleaner look).
  - Final layout: left spacer • centered logo • right spacer (so logo is truly centered).
- Bottom tab bar: exactly 3 tabs — **Home** (`/`), **My Bookings** (`/bookings`), **Profile** (`/profile`). Always visible on mobile, hidden on `md+`.
- Remove auth-conditional rendering.

## 7. Hero (Index page)

- Auto-playing slider, 2 slides cross-fading every 5s using `framer-motion` `AnimatePresence` with opacity transition.
- Slide images: `hero-team.jpg`, `hero-windows.jpg`.
- Overlay text: **"Huduma Safi Kipaumbele chetu"** + subtitle in Swahili.
- CTA **"Book a Service"** smooth-scrolls to `#services` (`scrollIntoView({ behavior: 'smooth' })`).
- Indicator dots synced & clickable.
- Dark gradient overlay for legibility.

## 8. Services section

- Section heading + grid of 5 cards (1 featured + 4 grid on mobile, 3-col on `md+`).
- Each card uses an image background + service name + Swahili tagline.
- Framer Motion: `whileHover={{ y: -4 }}`, `whileTap={{ scale: 0.97 }}`, shadow elevation on hover.
- Scroll-reveal: `initial={{ opacity:0, y:24 }}` + `whileInView` once.
- Click → opens **BookingModal** (not navigation).

## 9. BookingModal (glassmorphism)

New `src/components/BookingModal.tsx`
- Built on shadcn `Dialog` with custom class `bg-white/20 backdrop-blur-xl border border-white/30` and a soft gradient backdrop.
- Fields:
  - `Aina ya nyumba / ukubwa` (textarea, required)
  - `Tarehe` (date input, optional)
  - `Namba ya simu` (optional, prefilled if previously stored)
- Submit button: **"Tuma WhatsApp"**.
- On submit:
  1. `addBooking({ serviceKey, serviceName, details, createdAt: Date.now() })`
  2. Toast: "Booking imehifadhiwa" 
  3. `window.open('https://wa.me/255674044676?text=' + encodeURIComponent('Habari, nahitaji huduma ya ' + serviceName + '. ' + details), '_blank')`
- Framer Motion entry: scale + fade.

## 10. Bookings page (localStorage-driven)

Rewrite `src/pages/Bookings.tsx`:
- Read from `getBookings()`, subscribe to update event.
- Empty state with CTA to home.
- Each item: service name, details preview, relative date, delete button (per-item removal optional v2 — for now, only "Clear all" lives on Profile).
- Animate list in with staggered fade-up.

## 11. Profile page

New `src/pages/Profile.tsx`:
- Simple settings card: app name, version, "Clear booking history" button (confirm via shadcn `AlertDialog`).
- Footer-style note about WhatsApp contact.

## 12. Footer

New `src/components/Footer.tsx` (used on Index, hidden on small screens behind bottom nav padding, but still rendered above it):
- Logo + tagline.
- Social row using `react-icons/fa6`: Instagram, Facebook, TikTok with the exact URLs provided, opening in new tab with `rel="noopener noreferrer"`.
- Copyright line.
- Subtle gradient top border.

## 13. Animations (Framer Motion)

Add a small helper `src/lib/motion.ts`:
- `fadeUp`, `stagger`, `cardHover` variants.
- Use `motion.div` for sections with `whileInView` once, viewport `{ amount: 0.2 }`.
- Buttons: wrap in `motion.button` or apply `whileTap={{ scale: 0.96 }}`.
- Respects `prefers-reduced-motion` via Framer's built-in handling.

## 14. Branding

Keep current blue palette (already matches logo). No CSS variable changes needed beyond what already exists.

---

## Files summary

**Create**
- `src/lib/bookings.ts`
- `src/lib/motion.ts`
- `src/components/BookingModal.tsx`
- `src/components/Footer.tsx`
- `src/pages/Profile.tsx`
- `src/assets/hero-team.jpg`, `hero-windows.jpg`, `supplies.jpg`, `svc-home.jpg`, `svc-houses.jpg`, `svc-sheri.jpg`, `svc-shule.jpg`

**Rewrite**
- `src/App.tsx` (3 routes only)
- `src/components/Layout.tsx` (centered logo, 3-tab bottom nav)
- `src/pages/Index.tsx` (hero slider + 5-service grid + footer)
- `src/pages/Bookings.tsx` (localStorage)
- `src/lib/services.ts` (5 services, no pricing)

**Delete / leave unused**
- `src/pages/Auth.tsx`, `Book.tsx`, `Checkout.tsx`, `BookingDetail.tsx`, `Admin.tsx`
- `src/components/ProtectedRoute.tsx`, `src/hooks/useAuth.tsx`

**Dependencies added**: `framer-motion`, `react-icons`

---

## Out of scope
- No backend calls, no auth, no payments (placeholder via WhatsApp as requested).
- No price calculation UI.
- No per-booking deletion (only "Clear all" on Profile) — easy to add later.

Approve and I'll implement.