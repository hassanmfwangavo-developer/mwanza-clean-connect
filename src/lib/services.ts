import { Home, Building2, Fuel, GraduationCap, Sparkles, Briefcase, Trees, type LucideIcon } from "lucide-react";
import svcHome from "@/assets/svc-home.jpg";
import svcHouses from "@/assets/svc-houses.jpg";
import svcSheri from "@/assets/svc-sheri.jpg";
import svcShule from "@/assets/svc-shule.jpg";
import svcVifaa from "@/assets/supplies.jpg";
import svcOfisi from "@/assets/svc-ofisi.jpg";
import svcMazingira from "@/assets/svc-mazingira.jpg";

export type ServiceKey = "home" | "houses" | "sheri" | "shule" | "ofisi" | "mazingira" | "vifaa";

export interface ServiceDef {
  key: ServiceKey;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  image: string;
  /** Label shown in booking modal */
  modalTitle: string;
  /** Placeholder for textarea in booking modal */
  modalPlaceholder: string;
}

export const SERVICES: Record<ServiceKey, ServiceDef> = {
  home: {
    key: "home",
    name: "Home",
    tagline: "Nyumba zinazokaliwa",
    description: "Usafi wa kina kwa nyumba zinazokaliwa.",
    icon: Home,
    image: svcHome,
    modalTitle: "Mahali/Ukubwa wa nyumba",
    modalPlaceholder: "mfano: vyumba 3, sebule 2 na store",
  },
  houses: {
    key: "houses",
    name: "Houses",
    tagline: "Baada ya ujenzi (Apartments/Hostels)",
    description: "Usafi baada ya ujenzi wa apartments na hostels.",
    icon: Building2,
    image: svcHouses,
    modalTitle: "Mahali/Ukubwa wa nyumba",
    modalPlaceholder: "mfano: Nyumba yote na mazingira ya nje",
  },
  sheri: {
    key: "sheri",
    name: "Sheri",
    tagline: "Vituo vya mafuta",
    description: "Usafi wa vituo vya mafuta na maeneo ya wazi.",
    icon: Fuel,
    image: svcSheri,
    modalTitle: "Mahali/Ukubwa",
    modalPlaceholder: "mfano: Ofisi na eneo la Sheri lenye ukubwa wa meter 16-16",
  },
  shule: {
    key: "shule",
    name: "Shule & Daycares",
    tagline: "Usafi wa mazingira",
    description: "Usafi wa mazingira ya shule na vituo vya watoto.",
    icon: GraduationCap,
    image: svcShule,
    modalTitle: "Mahali/Ukubwa wa eneo",
    modalPlaceholder: "mfano: Madarasa 4, Ofisi 2, vyoo 10, barabara za shule na garden",
  },
  ofisi: {
    key: "ofisi",
    name: "Ofisi",
    tagline: "Usafi wa maofisi",
    description: "Usafi wa kitaalamu wa maofisi.",
    icon: Briefcase,
    image: svcOfisi,
    modalTitle: "Mahali/Ukubwa wa Ofisi",
    modalPlaceholder: "mfano: Vyumba 3 vya ofisi na mapokezi",
  },
  mazingira: {
    key: "mazingira",
    name: "Mazingira ya Nje",
    tagline: "Garden / Farm",
    description: "Usafi na utunzaji wa mazingira ya nje, bustani na mashamba.",
    icon: Trees,
    image: svcMazingira,
    modalTitle: "Ukubwa wa eneo",
    modalPlaceholder: "mfano: Ua wa mbele na bustani ya nyuma",
  },
  vifaa: {
    key: "vifaa",
    name: "Vifaa vya Usafi",
    tagline: "Vifaa, sabuni na kemikali",
    description: "Tunauza vifaa vya usafi, sabuni na kemikali za kitaalamu.",
    icon: Sparkles,
    image: svcVifaa,
    modalTitle: "Bidhaa unayohitaji",
    modalPlaceholder: "mfano: Sabuni za maji lita 5",
  },
};

export const SERVICE_LIST = Object.values(SERVICES);

export const WHATSAPP_NUMBER = "255757261966";

export function buildWhatsAppLink(serviceName: string, details?: string) {
  const text = `Habari, nahitaji huduma ya ${serviceName}.${details ? " " + details : ""}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function buildProductWhatsAppLink(productName: string, details: string) {
  const text = `Habari, nahitaji kununua ${productName}. Maelezo: ${details}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
