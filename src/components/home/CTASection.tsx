import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px]" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel rounded-3xl p-8 md:p-16 text-center glow-green relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Label */}
            <span className="inline-block px-4 py-1.5 glass-panel rounded-full text-xs font-display font-semibold tracking-widest uppercase text-primary mb-6">
              Join the Movement
            </span>

            {/* Headline */}
            <h2 className="font-display font-black text-3xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-6">
              <span className="text-foreground">Every Token Creates</span>
              <br />
              <span className="gradient-text text-glow">Impact.</span>
              <br />
              <span className="text-foreground">Every Holder Grows</span>
              <br />
              <span className="gradient-text-gold text-glow-gold">the Forest.</span>
            </h2>

            {/* Subtitle */}
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Be part of the green revolution. Join thousands of holders making a 
              real difference for our planet through blockchain technology.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl" asChild>
                <Link to="/buy-nft" className="gap-2">
                  <Sparkles className="w-5 h-5" />
                  Buy NFT
                </Link>
              </Button>
              <Button variant="gold" size="xl" asChild>
                <Link to="/dashboard" className="gap-2">
                  <Users className="w-5 h-5" />
                  Join Ecosystem
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
