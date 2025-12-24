import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GlassCard } from "@/components/common/GlassCard";

const tokenomicData = {
  totalSupply: "210,000,000 NXP",
  distribution: [
    { label: "NFT Mining Pool", value: "160,000,000", percentage: 76, color: "primary" },
    { label: "DEX/CEX Liquidity", value: "50,000,000", percentage: 24, color: "accent" },
  ],
};

const nftomicData = {
  totalSupply: "2,100,000 NFT",
  distribution: [
    { label: "Tree", value: "2,070,000", percentage: 98.57, color: "primary" },
    { label: "Diamond", value: "20,000", percentage: 0.95, color: "accent" },
    { label: "Carbon", value: "10,000", percentage: 0.45, color: "nexus-carbon" },
  ],
};

export const TokenomicsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 relative">
        <SectionHeader
          label="Economics"
          title="Tokenomics & NFTnomics"
          subtitle="A balanced and sustainable economic model designed for long-term growth and environmental impact."
        />

        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {/* Tokenomic Card */}
          <GlassCard className="p-8" glow>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-2xl gradient-text">
                  Tokenomic
                </h3>
                <span className="text-sm text-muted-foreground glass-panel px-3 py-1 rounded-full">
                  NXP Token
                </span>
              </div>

              {/* Total Supply */}
              <div className="text-center py-6 glass-panel rounded-xl">
                <p className="text-muted-foreground text-sm mb-2">Fixed Supply</p>
                <p className="font-display font-bold text-3xl text-primary text-glow">
                  {tokenomicData.totalSupply}
                </p>
              </div>

              {/* Distribution */}
              <div className="space-y-4">
                {tokenomicData.distribution.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground">{item.label}</span>
                      <span className="text-muted-foreground">
                        {item.value} ({item.percentage}%)
                      </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                        className={`h-full rounded-full ${
                          item.color === "primary"
                            ? "bg-primary glow-green-sm"
                            : "bg-accent glow-gold"
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Info */}
              <div className="pt-4 border-t border-border/30 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  NFT Holder → NFT Mining → Token Rewards
                </p>
              </div>
            </div>
          </GlassCard>

          {/* NFTnomic Card */}
          <GlassCard className="p-8" glow>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-2xl gradient-text">
                  NFTnomic
                </h3>
                <span className="text-sm text-muted-foreground glass-panel px-3 py-1 rounded-full">
                  NFT Collection
                </span>
              </div>

              {/* Total Supply */}
              <div className="text-center py-6 glass-panel rounded-xl">
                <p className="text-muted-foreground text-sm mb-2">Total NFT Supply</p>
                <p className="font-display font-bold text-3xl text-primary text-glow">
                  {nftomicData.totalSupply}
                </p>
              </div>

              {/* Distribution */}
              <div className="space-y-4">
                {nftomicData.distribution.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-sm ${
                          item.label === "Tree" ? "bg-primary" :
                          item.label === "Diamond" ? "bg-accent" : "bg-nexus-carbon"
                        }`} />
                        {item.label}
                      </span>
                      <span className="text-muted-foreground">
                        {item.value} ({item.percentage}%)
                      </span>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.min(item.percentage, 100)}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                        className={`h-full rounded-full ${
                          item.label === "Tree" ? "bg-primary glow-green-sm" :
                          item.label === "Diamond" ? "bg-accent" : "bg-nexus-carbon"
                        }`}
                        style={{ minWidth: item.percentage < 5 ? "20px" : undefined }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* NFT Types Legend */}
              <div className="pt-4 border-t border-border/30 grid grid-cols-3 gap-4 text-center">
                {["Tree", "Diamond", "Carbon"].map((type) => (
                  <div key={type} className="glass-panel rounded-lg p-3">
                    <p className="font-display font-semibold text-sm text-primary">{type}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {type === "Tree" ? "Common" : type === "Diamond" ? "Rare" : "Legendary"}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};
