import { NavLink, Outlet } from "react-router-dom";
import { Home as HomeIcon, CalendarCheck, User } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const Layout = () => {
  const tabClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex flex-col items-center justify-center gap-1 px-5 py-2 rounded-2xl transition-smooth flex-1 active:scale-95",
      isActive ? "bg-primary-soft text-primary" : "text-muted-foreground hover:text-foreground"
    );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-center h-16 relative">
          <NavLink to="/" aria-label="Kansolele home" className="flex items-center">
            <img
              src={logo}
              alt="Kansolele General Supply Enterprises"
              className="h-10 w-auto object-contain"
            />
          </NavLink>
        </div>
      </header>

      <main className="flex-1 pb-24"><Outlet /></main>

      {/* Bottom tab bar - 3 tabs */}
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
