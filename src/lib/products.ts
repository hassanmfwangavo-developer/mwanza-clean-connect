import sabuniMaji from "@/assets/prod-sabuni-maji.jpg";
import sabuniUnga from "@/assets/prod-sabuni-unga.jpg";
import mfagioNdani from "@/assets/prod-mfagio-ndani.jpg";
import mfagioNje from "@/assets/prod-mfagio-nje.jpg";
import mopper from "@/assets/prod-mopper.jpg";
import brushChooni from "@/assets/prod-brush-chooni.jpg";
import jembe from "@/assets/prod-jembe.jpg";
import reki from "@/assets/prod-reki.jpg";
import toiletPaper from "@/assets/prod-toilet-paper.jpg";
import tissue from "@/assets/prod-tissue.jpg";
import dishwash from "@/assets/prod-dishwash.jpg";
import bucketSet from "@/assets/prod-bucket-set.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
}

export const PRODUCTS: Product[] = [
  { id: "sabuni-maji", name: "Sabuni za Maji", description: "Sabuni ya maji ya usafi wa jumla.", image: sabuniMaji },
  { id: "sabuni-unga", name: "Sabuni za Unga", description: "Sabuni ya unga kwa nguo na sakafu.", image: sabuniUnga },
  { id: "dishwash", name: "Sabuni ya Vyombo", description: "Sabuni ya kuoshea vyombo.", image: dishwash },
  { id: "mfagio-ndani", name: "Mifagio ya Ndani", description: "Mifagio laini ya kufagia ndani.", image: mfagioNdani },
  { id: "mfagio-nje", name: "Mifagio ya Nje", description: "Mifagio imara ya kufagia nje.", image: mfagioNje },
  { id: "mopper", name: "Mopper (Dekio)", description: "Dekio la kusafisha sakafu.", image: mopper },
  { id: "brush-chooni", name: "Brush za Chooni", description: "Brashi za kusafisha vyoo.", image: brushChooni },
  { id: "jembe", name: "Majembe", description: "Majembe ya bustani na shamba.", image: jembe },
  { id: "reki", name: "Reki", description: "Reki za kukusanya majani na takataka.", image: reki },
  { id: "toilet-paper", name: "Toilet Paper", description: "Karatasi za chooni laini.", image: toiletPaper },
  { id: "tissue", name: "Tissue", description: "Tissue za usoni na mikononi.", image: tissue },
  { id: "kit", name: "Kit ya Usafi", description: "Set kamili ya vifaa vya usafi.", image: bucketSet },
];
