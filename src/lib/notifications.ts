export interface AppNotification {
  id: string;
  message: string;
  createdAt: number;
  read: boolean;
}

const KEY = "kansolele.notifications.v1";
const EVENT = "kansolele:notifications-changed";

export function getNotifications(): AppNotification[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as AppNotification[];
  } catch {
    return [];
  }
}

export function addNotification(message: string): AppNotification {
  const n: AppNotification = {
    id: crypto.randomUUID(),
    message,
    createdAt: Date.now(),
    read: false,
  };
  const all = [n, ...getNotifications()].slice(0, 20);
  localStorage.setItem(KEY, JSON.stringify(all));
  window.dispatchEvent(new CustomEvent(EVENT));
  return n;
}

export function markAllRead() {
  const all = getNotifications().map((n) => ({ ...n, read: true }));
  localStorage.setItem(KEY, JSON.stringify(all));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function clearNotifications() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function subscribeNotifications(cb: () => void): () => void {
  const handler = () => cb();
  window.addEventListener(EVENT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
