import { motion } from "framer-motion";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GlassCard } from "@/components/common/GlassCard";
import tokenomicImage from "@/assets/tokenomic-nexus.jpeg";
import nftnomicImage from "@/assets/nftnomic-nexus.jpeg";

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

        {/* Visual Diagrams */}
        <div className="mt-16 space-y-12">
          {/* Tokenomic Visual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-4 md:p-8 overflow-hidden" glow>
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                {/* Image */}
                <div className="lg:w-2/3 relative">
                  <img
                    src={tokenomicImage}
                    alt="Nexus Protocol Tokenomics"
                    className="w-full rounded-xl glow-green-sm"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-xl" />
                </div>
                
                {/* Info */}
                <div className="lg:w-1/3 space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-2xl gradient-text mb-2">
                      Tokenomic
                    </h3>
                    <span className="text-sm text-muted-foreground glass-panel px-3 py-1 rounded-full">
                      NXP Token
                    </span>
                  </div>

                  {/* Total Supply */}
                  <div className="text-center py-4 glass-panel rounded-xl">
                    <p className="text-muted-foreground text-sm mb-1">Fixed Supply</p>
                    <p className="font-display font-bold text-2xl text-primary text-glow">
                      {tokenomicData.totalSupply}
                    </p>
                  </div>

                  {/* Distribution */}
                  <div className="space-y-3">
                    {tokenomicData.distribution.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="space-y-1"
                      >
                        <div className="flex justify-between text-sm">
                          <span className="text-foreground">{item.label}</span>
                          <span className="text-primary font-display font-semibold">
                            {item.percentage}%
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
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
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* NFTnomic Visual */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlassCard className="p-4 md:p-8 overflow-hidden" glow>
              <div className="flex flex-col lg:flex-row-reverse gap-8 items-center">
                {/* Image */}
                <div className="lg:w-2/3 relative">
                  <img
                    src={nftnomicImage}
                    alt="Nexus Protocol NFTnomics"
                    className="w-full rounded-xl glow-green-sm"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-xl" />
                </div>
                
                {/* Info */}
                <div className="lg:w-1/3 space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-2xl gradient-text mb-2">
                      NFTnomic
                    </h3>
                    <span className="text-sm text-muted-foreground glass-panel px-3 py-1 rounded-full">
                      NFT Collection
                    </span>
                  </div>

                  {/* Total Supply */}
                  <div className="text-center py-4 glass-panel rounded-xl">
                    <p className="text-muted-foreground text-sm mb-1">Total NFT Supply</p>
                    <p className="font-display font-bold text-2xl text-primary text-glow">
                      {nftomicData.totalSupply}
                    </p>
                  </div>

                  {/* Distribution */}
                  <div className="space-y-3">
                    {nftomicData.distribution.map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-sm ${
                            item.label === "Tree" ? "bg-primary glow-green-sm" :
                            item.label === "Diamond" ? "bg-accent" : "bg-nexus-carbon"
                          }`} />
                          <span className="text-foreground text-sm">{item.label}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-primary font-display font-semibold text-sm">
                            {item.value}
                          </span>
                          <span className="text-muted-foreground text-xs ml-2">
                            ({item.percentage}%)
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* NFT Types Legend */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {["Tree", "Diamond", "Carbon"].map((type) => (
                      <div key={type} className="glass-panel rounded-lg p-2">
                        <p className="font-display font-semibold text-xs text-primary">{type}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {type === "Tree" ? "Common" : type === "Diamond" ? "Rare" : "Legendary"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
