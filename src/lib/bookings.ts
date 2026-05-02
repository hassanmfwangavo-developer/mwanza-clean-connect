export interface Booking {
  id: string;
  serviceKey: string;
  serviceName: string;
  details: string;
  date?: string;
  phone?: string;
  createdAt: number;
}

const KEY = "kansolele.bookings.v1";
const EVENT = "kansolele:bookings-changed";

export function getBookings(): Booking[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Booking[];
  } catch {
    return [];
  }
}

export function addBooking(b: Omit<Booking, "id" | "createdAt"> & Partial<Pick<Booking, "id" | "createdAt">>): Booking {
  const booking: Booking = {
    id: b.id ?? crypto.randomUUID(),
    createdAt: b.createdAt ?? Date.now(),
    serviceKey: b.serviceKey,
    serviceName: b.serviceName,
    details: b.details,
    date: b.date,
    phone: b.phone,
  };
  const all = [booking, ...getBookings()];
  localStorage.setItem(KEY, JSON.stringify(all));
  window.dispatchEvent(new CustomEvent(EVENT));
  return booking;
}

export function clearBookings() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function subscribeBookings(cb: () => void): () => void {
  const handler = () => cb();
  window.addEventListener(EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
