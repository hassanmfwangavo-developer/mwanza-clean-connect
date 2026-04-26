import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Sparkles, LogOut, LayoutDashboard, CalendarCheck, Home as HomeIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Layout = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const navItem = ({ isActive }: { isActive: boolean }) =>
    cn(
      "px-3 py-2 rounded-lg text-sm font-medium transition-smooth flex items-center gap-2",
      isActive ? "bg-primary-soft text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted"
    );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-9 h-9 rounded-xl gradient-hero flex items-center justify-center shadow-elegant">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-[Plus_Jakarta_Sans]">SafiPro<span className="text-primary"> Mwanza</span></span>
          </Link>
          {user && (
            <nav className="hidden md:flex items-center gap-1">
              <NavLink to="/" end className={navItem}><HomeIcon className="w-4 h-4" />Home</NavLink>
              <NavLink to="/bookings" className={navItem}><CalendarCheck className="w-4 h-4" />My Bookings</NavLink>
              {isAdmin && <NavLink to="/admin" className={navItem}><LayoutDashboard className="w-4 h-4" />Admin</NavLink>}
            </nav>
          )}
          <div className="flex items-center gap-2">
            {user ? (
              <Button variant="ghost" size="sm" onClick={async () => { await signOut(); navigate("/auth"); }}>
                <LogOut className="w-4 h-4" /> Sign out
              </Button>
            ) : (
              <Button size="sm" onClick={() => navigate("/auth")}>Sign in</Button>
            )}
          </div>
        </div>
        {user && (
          <nav className="md:hidden border-t border-border bg-background">
            <div className="container flex gap-1 py-2 overflow-x-auto">
              <NavLink to="/" end className={navItem}><HomeIcon className="w-4 h-4" />Home</NavLink>
              <NavLink to="/bookings" className={navItem}><CalendarCheck className="w-4 h-4" />Bookings</NavLink>
              {isAdmin && <NavLink to="/admin" className={navItem}><LayoutDashboard className="w-4 h-4" />Admin</NavLink>}
            </div>
          </nav>
        )}
      </header>
      <main className="flex-1"><Outlet /></main>
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} SafiPro Mwanza · Professional Cleaning Services
      </footer>
    </div>
  );
};

export default Layout;
