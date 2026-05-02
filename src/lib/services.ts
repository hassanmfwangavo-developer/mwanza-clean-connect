import { Home, Building2, Fuel, GraduationCap, Sparkles, type LucideIcon } from "lucide-react";
import svcHome from "@/assets/svc-home.jpg";
import svcHouses from "@/assets/svc-houses.jpg";
import svcSheri from "@/assets/svc-sheri.jpg";
import svcShule from "@/assets/svc-shule.jpg";
import svcVifaa from "@/assets/supplies.jpg";

export type ServiceKey = "home" | "houses" | "sheri" | "shule" | "vifaa";

export interface ServiceDef {
  key: ServiceKey;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  image: string;
}

export const SERVICES: Record<ServiceKey, ServiceDef> = {
  home: {
    key: "home",
    name: "Home",
    tagline: "Nyumba zinazokaliwa",
    description: "Usafi wa kina kwa nyumba zinazokaliwa.",
    icon: Home,
    image: svcHome,
  },
  houses: {
    key: "houses",
    name: "Houses",
    tagline: "Baada ya ujenzi (Apartments/Hostels)",
    description: "Usafi baada ya ujenzi wa apartments na hostels.",
    icon: Building2,
    image: svcHouses,
  },
  sheri: {
    key: "sheri",
    name: "Sheri",
    tagline: "Vituo vya mafuta",
    description: "Usafi wa vituo vya mafuta na maeneo ya wazi.",
    icon: Fuel,
    image: svcSheri,
  },
  shule: {
    key: "shule",
    name: "Shule & Daycares",
    tagline: "Usafi wa mazingira",
    description: "Usafi wa mazingira ya shule na vituo vya watoto.",
    icon: GraduationCap,
    image: svcShule,
  },
  vifaa: {
    key: "vifaa",
    name: "Vifaa vya Usafi",
    tagline: "Vifaa, sabuni na kemikali",
    description: "Tunauza vifaa vya usafi, sabuni na kemikali za kitaalamu.",
    icon: Sparkles,
    image: svcVifaa,
  },
};

export const SERVICE_LIST = Object.values(SERVICES);

export const WHATSAPP_NUMBER = "255674044676";

export function buildWhatsAppLink(serviceName: string, details?: string) {
  const text = `Habari, nahitaji huduma ya ${serviceName}.${details ? " " + details : ""}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
