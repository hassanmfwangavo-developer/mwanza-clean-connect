import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SERVICE_LIST, type ServiceDef } from "@/lib/services";
import { fadeUp, stagger } from "@/lib/motion";
import BookingModal from "@/components/BookingModal";
import Footer from "@/components/Footer";
import MapSection from "@/components/MapSection";
import Testimonials from "@/components/Testimonials";
import FaqSection from "@/components/FaqSection";
import Seo from "@/components/Seo";
import heroTeam from "@/assets/hero-team.jpg";
import heroWindows from "@/assets/hero-windows.jpg";

const heroSlides = [
  { image: heroTeam, alt: "Kansolele cleaning team" },
  { image: heroWindows, alt: "Professional window cleaning" },
];

const Index = () => {
  const [slide, setSlide] = useState(0);
  const [selected, setSelected] = useState<ServiceDef | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const openBooking = (svc: ServiceDef) => {
    if (svc.key === "vifaa") {
      window.dispatchEvent(new CustomEvent("kansolele:open-vifaa"));
      return;
    }
    setSelected(svc);
    setOpen(true);
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Kansolele Professional Cleaners",
    description:
      "Huduma ya usafi wa majumba, ofisi, madirisha, bustani na shule jijini Mwanza, Tanzania.",
    areaServed: "Mwanza, Tanzania",
    telephone: "+255757261966",
    url: typeof window !== "undefined" ? window.location.origin : undefined,
  };

  return (
    <>
      <Seo
        title="Kansolele Cleaners Mwanza — Huduma Safi za Kitaalamu"
        description="Book usafi wa nyumba, ofisi, madirisha, bustani na shule jijini Mwanza. Timu ya kitaalamu, bei nzuri, huduma ya haraka kupitia WhatsApp."
        path="/"
        jsonLd={jsonLd}
      />
      <div className="container max-w-xl md:max-w-3xl py-5 space-y-10">
        {/* Hero */}
        <motion.section initial="hidden" animate="show" variants={fadeUp}>
          <div className="relative rounded-3xl overflow-hidden shadow-elegant aspect-[4/5] md:aspect-[16/9]">
            <AnimatePresence mode="sync">
              <motion.img
                key={slide}
                src={heroSlides[slide].image}
                alt={heroSlides[slide].alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-black/20" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-primary-foreground">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-3xl md:text-5xl font-extrabold leading-tight mb-3 drop-shadow-lg"
              >
                Huduma Safi<br />Kipaumbele chetu
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="text-sm md:text-base text-primary-foreground/90 mb-5 max-w-md drop-shadow"
              >
                Tunafanya usafi wa majumbani na maofisini kwa kiwango cha juu.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="self-start"
              >
                <Button
                  onClick={scrollToServices}
                  size="lg"
                  className="bg-card text-primary hover:bg-card/90 rounded-full px-7 font-semibold shadow-soft"
                >
                  Book a Service
                </Button>
              </motion.div>
              <div className="flex items-center justify-center gap-2 mt-5">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={cn(
                      "h-1.5 rounded-full transition-smooth",
                      i === slide ? "w-8 bg-card" : "w-1.5 bg-card/50 hover:bg-card/80"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Services */}
        <motion.section
          id="services"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="space-y-4 scroll-mt-20"
        >
          <motion.div variants={fadeUp}>
            <h2 className="text-2xl md:text-3xl font-bold mb-1">Our Services</h2>
            <p className="text-sm text-muted-foreground">Suluhisho la kitaalamu kwa kila eneo</p>
          </motion.div>

          <div className="space-y-5">
            {SERVICE_LIST.map((svc) => {
              const Icon = svc.icon;
              return (
                <motion.button
                  key={svc.key}
                  variants={fadeUp}
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => openBooking(svc)}
                  className="group relative w-full text-left rounded-3xl overflow-hidden shadow-elegant border border-border/60 hover:border-primary/40 transition-smooth bg-card"
                >
                  <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                    <img
                      src={svc.image}
                      alt={svc.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/55 to-primary/15" />
                    <div className="absolute top-4 right-4 w-12 h-12 rounded-2xl bg-white/95 backdrop-blur text-primary flex items-center justify-center shadow-soft">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="absolute inset-y-0 right-0 left-0 md:left-auto md:w-2/3 flex flex-col justify-center p-6 md:p-8 text-primary-foreground">
                      <h3 className="text-2xl md:text-4xl font-extrabold leading-tight drop-shadow">
                        {svc.name}
                      </h3>
                      <p className="text-sm md:text-base text-primary-foreground/90 mt-1 max-w-sm drop-shadow">
                        {svc.tagline}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1 self-start text-xs md:text-sm font-bold uppercase tracking-wider bg-card text-primary px-4 py-2 rounded-full shadow-soft group-hover:bg-white transition-smooth">
                        Book Now →
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.section>

        <Testimonials />
        <FaqSection />
        <MapSection />
      </div>

      <Footer />

      <BookingModal service={selected} open={open} onOpenChange={setOpen} />
    </>
  );
};

export default Index;
