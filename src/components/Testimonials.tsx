import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { fadeUp } from "@/lib/motion";

const TESTIMONIALS = [
  {
    quote:
      "Kansolele walifanya usafi ofisini kwetu baada ya ujenzi, walikuwa makini sana na kazi nzuri.",
    name: "Neema",
    location: "Kisesa",
  },
  {
    quote:
      "Wana vifaa vya kisasa sana. Zulia langu lilikuwa chafu sana lakini sasa linang'aa.",
    name: "Juma",
    location: "Isamilo",
  },
  {
    quote:
      "Huduma ya haraka na bei nafuu. Niliwaita kufanya usafi wa nyumba nzima, hawakuniangusha.",
    name: "Sarah",
    location: "Mkolani",
  },
  {
    quote:
      "Timu ya kitaalamu sana. Walifanya kazi kwa wakati na waliacha mahali pakiwa pasafi kabisa.",
    name: "Hamisi",
    location: "Ilemela",
  },
  {
    quote:
      "Bei ni rafiki na huduma ni ya hali ya juu. Nawapendekeza kwa kila mtu Mwanza.",
    name: "Asha",
    location: "Mkuyuni",
  },
];

const Testimonials = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  // Gentle auto-scroll using requestAnimationFrame
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let rafId: number;
    const tick = () => {
      if (!paused && el) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 0) {
          if (el.scrollLeft >= max - 1) {
            el.scrollTo({ left: 0, behavior: "auto" });
          } else {
            el.scrollLeft += 0.4;
          }
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [paused]);

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      className="space-y-4"
    >
      <div>
        <h2 className="text-2xl md:text-3xl font-bold leading-tight">Wateja Wanasema</h2>
        <p className="text-sm text-muted-foreground">Maoni halisi kutoka kwa wateja wetu</p>
      </div>

      <style>{`.testimonial-scroll::-webkit-scrollbar{display:none}`}</style>
      <div
        ref={scrollRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setTimeout(() => setPaused(false), 1500)}
        className="testimonial-scroll -mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {TESTIMONIALS.map((t, i) => (
          <article
            key={i}
            className="snap-start shrink-0 w-[85vw] max-w-xs sm:w-[60%] md:w-[42%] rounded-3xl p-5 border border-white/40 bg-white/70 backdrop-blur-xl shadow-elegant"
          >
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="w-4 h-4 fill-warning text-warning" />
              ))}
            </div>
            <p className="italic text-sm md:text-base text-foreground/90 leading-relaxed">
              "{t.quote}"
            </p>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide bg-success/10 text-success px-2 py-1 rounded-full">
                <BadgeCheck className="w-3 h-3" /> Verified
              </span>
            </div>
          </article>
        ))}
      </div>
    </motion.section>
  );
};

export default Testimonials;
