import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { fadeUp } from "@/lib/motion";

const FAQS = [
  {
    q: "Je, mnakuja na vifaa vyenu vya usafi?",
    a: "Ndio, tunakuja na mashine, sabuni, na vifaa vyote vinavyohitajika. Wewe tuite tu!",
  },
  {
    q: "Mnafanya kazi maeneo gani?",
    a: "Kwa sasa tunatoa huduma zetu ndani ya jiji lote la Mwanza na maeneo jirani.",
  },
  {
    q: "Malipo yanafanyikaje?",
    a: "Unalipa baada ya kazi kukamilika na kuridhika na kiwango chetu cha usafi.",
  },
  {
    q: "Nawezaje kupata huduma ya dharura?",
    a: "Bonyeza kitufe cha WhatsApp kwenye app yetu na tutakujibu papo hapo.",
  },
];

const FaqSection = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeUp}
      className="space-y-4"
    >
      <div>
        <h2 className="text-2xl md:text-3xl font-bold leading-tight">
          Maswali Yanayoulizwa Sana
        </h2>
        <p className="text-sm text-muted-foreground">Tunajibu maswali yako muhimu</p>
      </div>

      <div className="space-y-3">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={i}
              layout
              className="rounded-2xl border border-border bg-card shadow-soft overflow-hidden"
            >
              <motion.button
                layout
                onClick={() => setOpen(isOpen ? null : i)}
                whileTap={{ scale: 0.985 }}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-semibold text-sm md:text-base text-foreground">
                  {item.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0 w-8 h-8 rounded-full bg-primary-soft text-primary flex items-center justify-center"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.span>
              </motion.button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default FaqSection;
