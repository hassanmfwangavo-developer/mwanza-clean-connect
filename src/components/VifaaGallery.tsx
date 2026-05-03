import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PRODUCTS, type Product } from "@/lib/products";
import { buildProductWhatsAppLink } from "@/lib/services";
import { fadeUp, stagger } from "@/lib/motion";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const VifaaGallery = ({ open, onOpenChange }: Props) => {
  const [selected, setSelected] = useState<Product | null>(null);
  const [details, setDetails] = useState("");

  const handleBuy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected || !details.trim()) {
      toast.error("Tafadhali jaza maelezo");
      return;
    }
    window.open(buildProductWhatsAppLink(selected.name, details.trim()), "_blank", "noopener,noreferrer");
    toast.success("Inakupeleka WhatsApp...");
    setDetails("");
    setSelected(null);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border">
              <div className="container max-w-5xl flex items-center justify-between h-16">
                <div>
                  <h2 className="text-lg md:text-xl font-extrabold leading-tight">Vifaa & Teknolojia</h2>
                  <p className="text-xs text-muted-foreground">Bidhaa zetu za usafi</p>
                </div>
                <button
                  aria-label="Funga"
                  onClick={() => onOpenChange(false)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-foreground hover:bg-primary-soft active:scale-95 transition-smooth"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Grid */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="container max-w-5xl py-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {PRODUCTS.map((p) => (
                <motion.div
                  key={p.id}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl overflow-hidden bg-card border border-border/60 shadow-soft hover:shadow-elegant transition-smooth flex flex-col"
                >
                  <div className="aspect-square bg-white overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 flex flex-col flex-1">
                    <h3 className="font-bold text-sm leading-tight">{p.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 flex-1">{p.description}</p>
                    <Button
                      onClick={() => { setSelected(p); setDetails(""); }}
                      size="sm"
                      className="mt-3 w-full rounded-full font-semibold gradient-hero shadow-soft"
                    >
                      <ShoppingBag className="w-4 h-4" /> Nunua
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buy Dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="bg-white/80 backdrop-blur-2xl border border-white/40 shadow-elegant rounded-3xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-extrabold">{selected?.name}</DialogTitle>
            <DialogDescription className="text-foreground/70">
              Tafadhali andika kiasi/maelezo unayohitaji
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBuy} className="space-y-4 mt-2">
            <div className="space-y-2">
              <Label htmlFor="qty">Kiasi / Maelezo</Label>
              <Textarea
                id="qty"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="mfano: Lita 5, vipande 10..."
                className="bg-white/60 border-white/50 backdrop-blur min-h-[90px]"
                required
              />
            </div>
            <Button type="submit" size="lg" className="w-full rounded-full font-semibold gradient-hero shadow-elegant">
              <ShoppingBag className="w-5 h-5" /> Tuma WhatsApp
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VifaaGallery;
