import { motion } from "framer-motion";
import { Building2, Home, Hammer, Hotel, Sparkles } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";

const DETAILED_SERVICES = [
  {
    icon: Building2,
    title: "Usafi wa Ofisini & Viwandani",
    en: "Office & Industrial Cleaning",
    desc: "Professional cleaning for offices, factories, and commercial spaces across Mwanza — daily, weekly, or one-off contracts.",
  },
  {
    icon: Home,
    title: "Nyumbani & Geto (Residential)",
    en: "Residential Deep Cleaning",
    desc: "Deep cleaning and room makeovers for homes, apartments, na maghorofa. Usafi wa kuhamia pia upo.",
  },
  {
    icon: Hammer,
    title: "Usafi Baada ya Ujenzi",
    en: "Post-Construction Cleaning",
    desc: "Specialized heavy-duty cleaning after building or renovations — kuondoa vumbi, simenti, na rangi.",
  },
  {
    icon: Hotel,
    title: "Specialized Venues",
    en: "Hotels, Restaurants, Health Centres & Gas Stations",
    desc: "Hotels, restaurants, vituo vya afya, na vituo vya mafuta — huduma maalum yenye viwango vya juu vya usafi.",
  },
];

const ServicesDetail = () => (
  <motion.section
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.15 }}
    variants={stagger}
    className="space-y-5"
    aria-labelledby="huduma-zetu-heading"
  >
    <motion.div variants={fadeUp}>
      <h2 id="huduma-zetu-heading" className="text-2xl md:text-3xl font-bold mb-1">
        Huduma Zetu / Our Services
      </h2>
      <p className="text-sm text-muted-foreground">
        Top-tier cleaning services in Mwanza, Tanzania — residential, commercial, na industrial.
      </p>
    </motion.div>

    {/* Why Choose Us banner */}
    <motion.div
      variants={fadeUp}
      role="note"
      className="relative overflow-hidden rounded-3xl p-5 md:p-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-elegant"
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 w-11 h-11 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-primary-foreground/80">
            Why Choose Us
          </p>
          <p className="mt-1 text-base md:text-lg font-extrabold leading-snug">
            Vifaa vya usafi, sabuni, na kemikali zote ni juu yetu!
          </p>
          <p className="text-sm text-primary-foreground/90 mt-1">
            We provide all top-tier cleaning equipment and chemicals — wewe tuite tu.
          </p>
        </div>
      </div>
    </motion.div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {DETAILED_SERVICES.map(({ icon: Icon, title, en, desc }) => (
        <motion.article
          key={title}
          variants={fadeUp}
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elegant transition-smooth"
        >
          <div className="w-11 h-11 rounded-2xl bg-primary-soft text-primary flex items-center justify-center mb-3">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="text-base md:text-lg font-bold leading-tight">{title}</h3>
          <p className="text-xs font-semibold text-primary mt-0.5">{en}</p>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{desc}</p>
        </motion.article>
      ))}
    </div>
  </motion.section>
);

export default ServicesDetail;
