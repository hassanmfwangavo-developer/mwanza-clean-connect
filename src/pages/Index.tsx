import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck, Plus, Package } from "lucide-react";
import { SERVICES } from "@/lib/services";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import heroImg from "@/assets/hero-cleaner.jpg";

const heroSlides = [
  {
    image: heroImg,
    title: "Huduma Safi \nKIpaumbele chetu",
    subtitle: "Tunafanya Usafi wa majumbani na maofisini kwa kiwango cha juu.",
    cta: "Book a Service",
    href: "#services",
  },
  {
    image: heroImg,
    title: "Trusted Teams,\nSparkling Results",
    subtitle: "Vetted professionals serving homes and offices across Mwanza.",
    cta: "Explore Services",
    href: "#services",
  },
  {
    image: heroImg,
    title: "Book in Seconds,\nRelax for Hours",
    subtitle: "Pick a service, choose a time — we handle the rest.",
    cta: "Get Started",
    href: "#services",
  },
];

const Index = () => {
  const [slide, setSlide] = useState(0);
  const featured = SERVICES.residential;
  const grid = [SERVICES.office, SERVICES.windows, SERVICES.garden, SERVICES.schools];
  const current = heroSlides[slide];

  return (
    <div className="container max-w-xl md:max-w-3xl py-5 space-y-8">
      {/* Hero carousel card */}
      <section>
        <div className="relative rounded-3xl overflow-hidden shadow-elegant aspect-[4/5] md:aspect-[16/9]">
          <img
            src={current.image}
            alt="Professional cleaner at work"
            className="absolute inset-0 w-full h-full object-cover"
            width={1024}
            height={1280}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end p-6 text-primary-foreground">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight whitespace-pre-line mb-3">
              {current.title}
            </h1>
            <p className="text-sm md:text-base text-primary-foreground/90 mb-5 max-w-md">
              {current.subtitle}
            </p>
            <a href={current.href} className="self-start">
              <Button
                size="lg"
                className="bg-card text-primary hover:bg-card/90 rounded-full px-7 font-semibold shadow-soft active:scale-95 transition-smooth"
              >
                {current.cta}
              </Button>
            </a>
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
      </section>

      {/* Our Services header */}
      <section id="services" className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-1">Our Services</h2>
            <p className="text-sm text-muted-foreground">Expert solutions for every space</p>
          </div>
          <Link to="/bookings" className="text-primary font-semibold underline underline-offset-4 text-sm whitespace-nowrap">
            View all
          </Link>
        </div>

        {/* Featured service card */}
        <Link to={`/book/${featured.key}`} className="block group">
          <Card className="p-5 rounded-2xl border-border/60 shadow-soft hover:shadow-elegant transition-smooth active:scale-[0.99]">
            <div className="flex items-start justify-between mb-10">
              <div className="w-12 h-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center">
                <featured.icon className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-smooth" />
            </div>
            <h3 className="text-xl font-bold mb-1">{featured.name}</h3>
            <p className="text-sm text-muted-foreground">Deep cleaning for your home</p>
          </Card>
        </Link>

        {/* 2x2 grid of remaining services */}
        <div className="grid grid-cols-2 gap-4">
          {grid.map((svc) => (
            <Link key={svc.key} to={`/book/${svc.key}`} className="block group">
              <Card className="p-4 rounded-2xl h-full border-border/60 shadow-soft hover:shadow-elegant hover:border-primary/30 transition-smooth active:scale-[0.97]">
                <div className="w-11 h-11 rounded-xl bg-muted text-foreground flex items-center justify-center mb-10 group-hover:bg-primary-soft group-hover:text-primary transition-smooth">
                  <svc.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base mb-1">{svc.name}</h3>
                <p className="text-xs text-muted-foreground leading-snug">{svc.tagline}</p>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Promo: Cleaning Supplies */}
      <section>
        <Card className="relative overflow-hidden rounded-2xl border-0 shadow-elegant gradient-hero text-primary-foreground p-5 min-h-[170px]">
          <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-destructive text-destructive-foreground text-xs font-bold tracking-wide">
            SALE
          </div>
          <div className="w-11 h-11 rounded-xl bg-primary-foreground/15 backdrop-blur flex items-center justify-center mb-12">
            <Package className="w-5 h-5 text-primary-foreground" />
          </div>
          <h3 className="font-bold text-lg leading-tight">Cleaning Supplies</h3>
          <p className="text-sm text-primary-foreground/85">Professional grade tools</p>
        </Card>
      </section>

      {/* Trust card */}
      <section className="relative">
        <Card className="rounded-2xl bg-muted/60 border-0 p-5 flex gap-4 items-start">
          <div className="w-12 h-12 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base mb-1">Huduma Safi Verified</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every professional is background checked and trained to our premium standards.
            </p>
          </div>
        </Card>

        {/* Floating action button */}
        <Link to="/bookings" aria-label="New booking">
          <Button
            size="icon"
            className="absolute -bottom-6 right-2 w-14 h-14 rounded-2xl shadow-elegant active:scale-90 hover:shadow-glow transition-smooth"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Index;
