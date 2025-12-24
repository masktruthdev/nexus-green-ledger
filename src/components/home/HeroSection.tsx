import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoNexus from "@/assets/logo-nexus.jpeg";
import heroBackground from "@/assets/background-hero.jpeg";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="Nexus Protocol Background"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] animate-pulse-glow" />

      {/* Orbit Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-primary/20 rounded-full animate-spin-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/10 rounded-full animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "40s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mb-8"
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <img
                src={logoNexus}
                alt="Nexus Protocol"
                className="w-full h-full rounded-2xl object-cover glow-green-lg animate-float"
              />
              <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-pulse-glow" />
            </div>
            {/* Floating particles around logo */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full glow-green-sm"
                style={{
                  top: `${50 + 45 * Math.sin((i * Math.PI * 2) / 6)}%`,
                  left: `${50 + 45 * Math.cos((i * Math.PI * 2) / 6)}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            ))}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display font-black text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6"
          >
            <span className="text-foreground">One Nexus, One Tree</span>
            <br />
            <span className="gradient-text text-glow">A Green Blockchain</span>
            <br />
            <span className="text-foreground">for a Sustainable Future</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
          >
            Tokenizing Green RWA & Carbon Credit into a{" "}
            <span className="text-primary">Transparent</span> Global Economy
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/buy-nft" className="gap-2">
                <Sparkles className="w-5 h-5" />
                Buy NFT
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <Link to="/staking">Stake & Earn</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 md:gap-16"
          >
            {[
              { value: "210M", label: "Total Supply" },
              { value: "2.1M", label: "NFT Collection" },
              { value: "100%", label: "Green Impact" },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="font-display font-bold text-2xl md:text-4xl text-primary text-glow">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1 font-display uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
