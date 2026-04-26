import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ShieldCheck, Clock } from "lucide-react";
import { SERVICE_LIST, formatTZS } from "@/lib/services";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden gradient-soft">
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, hsl(210 95% 55% / 0.18), transparent 50%), radial-gradient(circle at 80% 70%, hsl(212 90% 38% / 0.15), transparent 50%)"
        }} />
        <div className="container relative py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-soft text-primary text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" /> Trusted across Mwanza
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Professional cleaning,<br />
              <span className="text-primary">at your doorstep.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Book reliable cleaning teams for your home, office, garden, school or windows — anywhere in Mwanza, Tanzania.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <a href="#services">Book a service <ArrowRight className="w-4 h-4" /></a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/bookings">My bookings</Link>
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-12 max-w-xl">
              {[
                { icon: ShieldCheck, label: "Vetted teams" },
                { icon: Clock, label: "On-time arrival" },
                { icon: Sparkles, label: "Quality guaranteed" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-start">
                  <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-2">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container py-16">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Choose a service</h2>
          <p className="text-muted-foreground">Pick what you need — we'll handle the rest.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICE_LIST.map(svc => {
            const Icon = svc.icon;
            return (
              <Link key={svc.key} to={`/book/${svc.key}`}>
                <Card className="p-6 h-full transition-smooth hover:shadow-elegant hover:-translate-y-1 hover:border-primary/40 group cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center mb-4 shadow-soft group-hover:shadow-glow transition-smooth">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{svc.name}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{svc.tagline}</p>
                  <p className="text-sm text-muted-foreground mb-4">{svc.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">From</span>
                    <span className="font-bold text-primary">{formatTZS(svc.basePrice + svc.unitPrice)}</span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Index;
