import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Home as HomeIcon, CalendarCheck, User, Menu, Bell, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import { WHATSAPP_NUMBER } from "@/lib/services";
import VifaaGallery from "@/components/VifaaGallery";
import {
  getNotifications,
  subscribeNotifications,
  markAllRead,
  clearNotifications,
  type AppNotification,
} from "@/lib/notifications";

const Layout = () => {
  const [notifs, setNotifs] = useState<AppNotification[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [vifaaOpen, setVifaaOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const goHome = async () => {
    setDrawerOpen(false);
    if (location.pathname !== "/") navigate("/");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };
  const goServices = async () => {
    setDrawerOpen(false);
    if (location.pathname !== "/") navigate("/");
    setTimeout(
      () => document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" }),
      80,
    );
  };
  const openVifaa = () => {
    setDrawerOpen(false);
    setVifaaOpen(true);
  };
  const openMsaada = () => {
    setDrawerOpen(false);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank", "noopener,noreferrer");
  };

  const drawerLinks: { label: string; onClick: () => void }[] = [
    { label: "Home", onClick: goHome },
    { label: "Huduma Zetu", onClick: goServices },
    { label: "Vifaa & Teknolojia", onClick: openVifaa },
    { label: "Msaada", onClick: openMsaada },
  ];

  useEffect(() => {
    setNotifs(getNotifications());
    return subscribeNotifications(() => setNotifs(getNotifications()));
  }, []);

  const unreadCount = notifs.filter((n) => !n.read).length;

  const tabClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex flex-col items-center justify-center gap-1 px-5 py-2 rounded-2xl transition-smooth flex-1 active:scale-95",
      isActive ? "bg-primary-soft text-primary" : "text-muted-foreground hover:text-foreground"
    );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16 gap-2">
          {/* Hamburger - far left */}
          <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="w-10 h-10 rounded-xl flex items-center justify-center text-foreground hover:bg-primary-soft active:scale-95 transition-smooth"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0 bg-background">
              <SheetHeader className="p-5 border-b border-border">
                <SheetTitle className="flex items-center gap-2">
                  <img src={logo} alt="Kansolele" className="h-8 w-auto object-contain" />
                </SheetTitle>
              </SheetHeader>
              <nav className="p-3 space-y-1">
                {drawerLinks.map((l) =>
                  l.external ? (
                    <a
                      key={l.label}
                      href={l.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setDrawerOpen(false)}
                      className="block px-4 py-3 rounded-xl text-base font-semibold text-foreground hover:bg-primary-soft hover:text-primary transition-smooth"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <NavLink
                      key={l.label}
                      to={l.to}
                      onClick={() => setDrawerOpen(false)}
                      className="block px-4 py-3 rounded-xl text-base font-semibold text-foreground hover:bg-primary-soft hover:text-primary transition-smooth"
                    >
                      {l.label}
                    </NavLink>
                  )
                )}
              </nav>
            </SheetContent>
          </Sheet>

          {/* Centered logo */}
          <NavLink to="/" aria-label="Kansolele home" className="flex items-center">
            <img
              src={logo}
              alt="Kansolele General Supply Enterprises"
              className="h-10 w-auto object-contain"
            />
          </NavLink>

          {/* Right - WhatsApp + Bell */}
          <div className="flex items-center gap-1">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-[#25D366] hover:bg-primary-soft active:scale-95 transition-smooth"
            >
              <FaWhatsapp className="w-5 h-5" />
            </a>

            <Popover onOpenChange={(o) => o && unreadCount > 0 && markAllRead()}>
              <PopoverTrigger asChild>
                <button
                  aria-label="Notifications"
                  className="relative w-10 h-10 rounded-xl flex items-center justify-center text-foreground hover:bg-primary-soft active:scale-95 transition-smooth"
                >
                  <Bell className="w-5 h-5" />
                  <AnimatePresence>
                    {unreadCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-destructive ring-2 ring-background"
                      />
                    )}
                  </AnimatePresence>
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-0 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <span className="font-bold">Arifa</span>
                  {notifs.length > 0 && (
                    <button
                      onClick={() => clearNotifications()}
                      className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1"
                    >
                      <X className="w-3 h-3" /> Futa zote
                    </button>
                  )}
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifs.length === 0 ? (
                    <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                      Hakuna arifa kwa sasa.
                    </div>
                  ) : (
                    notifs.map((n) => (
                      <div
                        key={n.id}
                        className="px-4 py-3 border-b border-border/60 last:border-0 hover:bg-primary-soft/40 transition-smooth"
                      >
                        <p className="text-sm text-foreground leading-snug">{n.message}</p>
                        <p className="text-[11px] text-muted-foreground mt-1">
                          {new Date(n.createdAt).toLocaleString("sw-TZ")}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-24"><Outlet /></main>

      <nav className="fixed bottom-0 inset-x-0 z-40 bg-card/95 backdrop-blur-md border-t border-border shadow-elegant">
        <div className="flex items-center gap-2 px-4 py-2 max-w-xl mx-auto">
          <NavLink to="/" end className={tabClass}>
            <HomeIcon className="w-5 h-5" />
            <span className="text-xs font-semibold">Home</span>
          </NavLink>
          <NavLink to="/bookings" className={tabClass}>
            <CalendarCheck className="w-5 h-5" />
            <span className="text-xs font-semibold">My Bookings</span>
          </NavLink>
          <NavLink to="/profile" className={tabClass}>
            <User className="w-5 h-5" />
            <span className="text-xs font-semibold">Profile</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
