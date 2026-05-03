import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Phone, MessageCircle, Sparkles } from "lucide-react";
import { clearBookings } from "@/lib/bookings";
import { toast } from "sonner";
import { WHATSAPP_NUMBER } from "@/lib/services";
import { fadeUp } from "@/lib/motion";

const Profile = () => {
  return (
    <div className="container max-w-xl py-6 space-y-5">
      <motion.div initial="hidden" animate="show" variants={fadeUp}>
        <h1 className="text-2xl font-extrabold mb-1">Profile</h1>
        <p className="text-sm text-muted-foreground">Mipangilio ya app yako</p>
      </motion.div>

      <motion.div initial="hidden" animate="show" variants={fadeUp}>
        <Card className="p-5 rounded-2xl shadow-soft border-border/60">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold">Kansolele Professional Cleaners</h3>
              <p className="text-xs text-muted-foreground">Toleo 1.0</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Booking zako zote zinahifadhiwa kwenye kifaa chako tu (private).
          </p>
        </Card>
      </motion.div>

      <motion.div initial="hidden" animate="show" variants={fadeUp}>
        <Card className="p-5 rounded-2xl shadow-soft border-border/60 space-y-3">
          <h3 className="font-bold">Wasiliana nasi</h3>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl bg-primary-soft text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-smooth active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5" /> WhatsApp
          </a>
          <a
            href={`tel:+${WHATSAPP_NUMBER}`}
            className="flex items-center gap-3 p-3 rounded-xl bg-muted text-foreground font-semibold hover:bg-muted/70 transition-smooth active:scale-[0.98]"
          >
            <Phone className="w-5 h-5" /> +255 674 044 676
          </a>
        </Card>
      </motion.div>

      <motion.div initial="hidden" animate="show" variants={fadeUp}>
        <Card className="p-5 rounded-2xl shadow-soft border-destructive/30">
          <h3 className="font-bold mb-1">Futa historia ya bookings</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Hatua hii itafuta booking zote zilizohifadhiwa kwenye kifaa chako.
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="rounded-full">
                <Trash2 className="w-4 h-4" /> Futa zote
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Una uhakika?</AlertDialogTitle>
                <AlertDialogDescription>
                  Booking zako zote zitafutwa milele kutoka kifaa hiki.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Ghairi</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => { clearBookings(); toast.success("Historia imefutwa"); }}
                >
                  Futa
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Card>
      </motion.div>
    </div>
  );
};

export default Profile;
