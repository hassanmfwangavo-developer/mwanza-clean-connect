import { Home, Building2, Square, Trees, GraduationCap, type LucideIcon } from "lucide-react";

export type ServiceKey = "residential" | "office" | "windows" | "garden" | "schools";

export interface ServiceDef {
  key: ServiceKey;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  basePrice: number; // TZS
  unitLabel: string;
  unitPrice: number; // TZS per unit
}

export const SERVICES: Record<ServiceKey, ServiceDef> = {
  residential: {
    key: "residential",
    name: "Residential",
    tagline: "Homes & apartments",
    description: "Deep cleaning for living rooms, bedrooms, kitchens and bathrooms.",
    icon: Home,
    basePrice: 25000,
    unitLabel: "Number of rooms",
    unitPrice: 15000,
  },
  office: {
    key: "office",
    name: "Office",
    tagline: "Workspaces",
    description: "Professional office cleaning — desks, floors, restrooms.",
    icon: Building2,
    basePrice: 50000,
    unitLabel: "Office size (sq meters)",
    unitPrice: 800,
  },
  windows: {
    key: "windows",
    name: "Windows",
    tagline: "Streak-free shine",
    description: "Interior and exterior window cleaning for any building.",
    icon: Square,
    basePrice: 20000,
    unitLabel: "Number of windows",
    unitPrice: 3500,
  },
  garden: {
    key: "garden",
    name: "Garden",
    tagline: "Outdoor spaces",
    description: "Lawn mowing, hedge trimming and garden tidying.",
    icon: Trees,
    basePrice: 40000,
    unitLabel: "Garden size (sq meters)",
    unitPrice: 500,
  },
  schools: {
    key: "schools",
    name: "Schools",
    tagline: "Classrooms & halls",
    description: "Thorough cleaning for classrooms, halls and school facilities.",
    icon: GraduationCap,
    basePrice: 80000,
    unitLabel: "Number of rooms / halls",
    unitPrice: 18000,
  },
};

export const SERVICE_LIST = Object.values(SERVICES);

export function calculatePrice(key: ServiceKey, units: number): number {
  const svc = SERVICES[key];
  const u = Math.max(1, Number(units) || 1);
  return svc.basePrice + svc.unitPrice * u;
}

export function formatTZS(amount: number): string {
  return "TZS " + new Intl.NumberFormat("en-US").format(Math.round(amount));
}

export const STATUS_LABELS: Record<string, string> = {
  received: "Order Received",
  confirmed: "Confirmed",
  in_progress: "Cleaning in Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const STATUS_FLOW = ["received", "confirmed", "in_progress", "completed"] as const;
