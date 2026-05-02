import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SERVICE_LIST, type ServiceDef } from "@/lib/services";
import { fadeUp, stagger } from "@/lib/motion";
import BookingModal from "@/components/BookingModal";
import Footer from "@/components/Footer";
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
    setSelected(svc);
    setOpen(true);
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
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

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {SERVICE_LIST.map((svc) => {
              const Icon = svc.icon;
              return (
                <motion.button
                  key={svc.key}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => openBooking(svc)}
                  className="group text-left rounded-2xl overflow-hidden bg-card shadow-soft hover:shadow-elegant border border-border/60 hover:border-primary/40 transition-smooth"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={svc.image}
                      alt={svc.name}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-2 left-2 w-9 h-9 rounded-xl bg-white/90 backdrop-blur text-primary flex items-center justify-center shadow-soft">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-base leading-tight">{svc.name}</h3>
                    <p className="text-xs text-muted-foreground leading-snug mt-0.5 line-clamp-2">
                      {svc.tagline}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.section>
      </div>

      <Footer />

      <BookingModal service={selected} open={open} onOpenChange={setOpen} />
    </>
  );
};

export default Index;
