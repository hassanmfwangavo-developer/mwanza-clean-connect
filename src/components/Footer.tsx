import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa6";
import logo from "@/assets/logo.png";

const socials = [
  { href: "https://www.instagram.com/tatkan106?igsh=MTE4ZG04Z29obWxqcg==", icon: FaInstagram, label: "Instagram" },
  { href: "https://www.facebook.com/profile.php?id=61585579989382", icon: FaFacebookF, label: "Facebook" },
  { href: "https://www.tiktok.com/@kgs.12361?_r=1&_t=ZS-95uclIY291Y", icon: FaTiktok, label: "TikTok" },
];

const Footer = () => (
  <footer className="mt-12 border-t border-border bg-gradient-to-b from-background to-primary-soft/40">
    <div className="container max-w-3xl py-8 flex flex-col items-center gap-5 text-center">
      <img src={logo} alt="Kansolele" className="h-12 w-auto object-contain" />
      <p className="text-sm text-muted-foreground max-w-xs">
        Huduma Safi · Kipaumbele chetu. Tunahudumia Mwanza na maeneo jirani.
      </p>
      <div className="flex items-center gap-3">
        {socials.map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground hover:scale-110 active:scale-95 transition-smooth shadow-soft"
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} Kansolele General Supply Enterprises
      </p>
    </div>
  </footer>
);

export default Footer;
