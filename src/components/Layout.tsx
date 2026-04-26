import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, Bell, LogOut, LayoutDashboard, CalendarCheck, Home as HomeIcon, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Layout = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const initials = (user?.email || "U").slice(0, 1).toUpperCase();

  const tabClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex flex-col items-center justify-center gap-1 px-5 py-2 rounded-2xl transition-smooth flex-1 active:scale-95",
      isActive ? "bg-primary-soft text-primary" : "text-muted-foreground hover:text-foreground"
    );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary hover:bg-primary-soft">
                  <Menu className="w-6 h-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem onClick={() => navigate("/")}><HomeIcon className="w-4 h-4 mr-2" />Home</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/bookings")}><CalendarCheck className="w-4 h-4 mr-2" />My Bookings</DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem onClick={() => navigate("/admin")}><LayoutDashboard className="w-4 h-4 mr-2" />Admin</DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                {user ? (
                  <DropdownMenuItem onClick={async () => { await signOut(); navigate("/auth"); }}>
                    <LogOut className="w-4 h-4 mr-2" />Sign out
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => navigate("/auth")}>
                    <User className="w-4 h-4 mr-2" />Sign in
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/" className="text-primary font-extrabold text-xl tracking-tight font-[Plus_Jakarta_Sans]">
              kansolele
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-primary hover:bg-primary-soft relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive" />
            </Button>
            <NavLink to="/bookings" className="rounded-full">
              <Avatar className="w-9 h-9 ring-2 ring-primary-soft">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </NavLink>
          </div>
        </div>
      </header>

      <main className="flex-1 pb-24 md:pb-8"><Outlet /></main>

      {/* Mobile bottom tab bar */}
      {user && (
        <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-card border-t border-border shadow-elegant">
          <div className="flex items-center gap-2 px-4 py-2 max-w-xl mx-auto">
            <NavLink to="/" end className={tabClass}>
              <HomeIcon className="w-5 h-5" />
              <span className="text-xs font-semibold">Home</span>
            </NavLink>
            <NavLink to="/bookings" className={tabClass}>
              <CalendarCheck className="w-5 h-5" />
              <span className="text-xs font-semibold">My Bookings</span>
            </NavLink>
            <NavLink to={isAdmin ? "/admin" : "/bookings"} className={tabClass}>
              <User className="w-5 h-5" />
              <span className="text-xs font-semibold">{isAdmin ? "Admin" : "Profile"}</span>
            </NavLink>
          </div>
        </nav>
      )}

      <footer className="hidden md:block border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} kansolele · Professional Cleaning Services in Mwanza
      </footer>
    </div>
  );
};

export default Layout;
