import { motion } from "framer-motion";
import { Leaf, Shield, Coins, Globe, Zap, TreePine } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GlassCard } from "@/components/common/GlassCard";

const features = [
  {
    icon: TreePine,
    title: "One NXP = One Tree",
    description: "Every token minted represents a real tree planted, creating tangible environmental impact.",
  },
  {
    icon: Globe,
    title: "Green RWA On-Chain",
    description: "Real World Assets tokenized for transparency, liquidity, and global accessibility.",
  },
  {
    icon: Coins,
    title: "Carbon Credit Integration",
    description: "Certified carbon credits converted to blockchain tokens for verifiable offset tracking.",
  },
  {
    icon: Shield,
    title: "Immutable & Transparent",
    description: "All transactions and impact data permanently recorded on the blockchain.",
  },
  {
    icon: Zap,
    title: "NFT Mining Rewards",
    description: "Stake your NFTs to earn continuous NXP token rewards from the mining pool.",
  },
  {
    icon: Leaf,
    title: "Sustainable Economy",
    description: "Building a circular economy where growth and environmental protection coexist.",
  },
];

export const AboutSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] -translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative">
        <SectionHeader
          label="About Nexus"
          title="The Future of Green Finance"
          subtitle="Nexus Protocol bridges the gap between environmental impact and blockchain innovation, creating a sustainable ecosystem for all."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <GlassCard key={feature.title} delay={index * 0.1}>
              <div className="flex flex-col h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 glow-green-sm">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  {feature.description}
                </p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Ecosystem Visual */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <GlassCard className="p-8 md:p-12" glow>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h3 className="font-display font-bold text-2xl md:text-3xl">
                  The <span className="gradient-text">Nexus Ecosystem</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our integrated ecosystem connects NFT holders, token stakers, and real-world 
                  environmental projects into a single, transparent blockchain network.
                </p>
                <ul className="space-y-3">
                  {[
                    "Verified tree planting partnerships",
                    "Real-time carbon credit tracking",
                    "Decentralized governance",
                    "Cross-chain compatibility",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary glow-green-sm" />
                      <span className="text-foreground/80">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="relative flex items-center justify-center">
                <div className="relative w-64 h-64">
                  {/* Central Hub */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center glow-green animate-pulse-glow">
                    <span className="font-display font-bold text-primary text-lg">NXP</span>
                  </div>
                  {/* Orbit Elements */}
                  {["NFT", "RWA", "CO₂", "DAO"].map((label, i) => (
                    <motion.div
                      key={label}
                      className="absolute w-12 h-12 rounded-full glass-panel flex items-center justify-center"
                      style={{
                        top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 4 - Math.PI / 4)}%`,
                        left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 4 - Math.PI / 4)}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        delay: i * 0.3,
                        repeat: Infinity,
                      }}
                    >
                      <span className="text-xs font-display font-semibold text-primary">
                        {label}
                      </span>
                    </motion.div>
                  ))}
                  {/* Connecting Lines */}
                  <svg className="absolute inset-0 w-full h-full animate-spin-slow" style={{ animationDuration: "30s" }}>
                    <circle
                      cx="50%"
                      cy="50%"
                      r="80"
                      fill="none"
                      stroke="hsl(120, 100%, 50%, 0.2)"
                      strokeWidth="1"
                      strokeDasharray="10 5"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};
