import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface NFTCardProps {
  name: string;
  image: string;
  rarity: string;
  multiplier: string;
  supply: string;
  price?: string;
  onBuy?: () => void;
  floating?: boolean;
  disabled?: boolean;
}

export const NFTCard = ({
  name,
  image,
  rarity,
  multiplier,
  supply,
  price,
  onBuy,
  floating = true,
  disabled = false,
}: NFTCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className={`nft-card glass-panel rounded-2xl p-6 ${
        floating ? "animate-float" : ""
      }`}
      style={{ animationDelay: `${Math.random() * 2}s` }}
    >
      {/* Rarity Badge */}
      <div className="flex justify-between items-center mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-display font-semibold uppercase tracking-wider ${
            rarity === "Legendary"
              ? "bg-nexus-carbon/20 text-nexus-carbon"
              : rarity === "Rare"
              ? "bg-accent/20 text-accent"
              : "bg-primary/20 text-primary"
          }`}
        >
          {rarity}
        </span>
        <span className="text-xs text-muted-foreground">
          {supply} available
        </span>
      </div>

      {/* NFT Image */}
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 group">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Glow Effect */}
        <div
          className={`absolute inset-0 opacity-30 ${
            rarity === "Legendary"
              ? "bg-nexus-carbon/20"
              : rarity === "Rare"
              ? "bg-accent/20"
              : "bg-primary/20"
          } mix-blend-overlay`}
        />
      </div>

      {/* NFT Info */}
      <div className="space-y-3">
        <h3 className="font-display font-bold text-xl">{name}</h3>
        
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Reward Multiplier</span>
          <span className="font-display font-semibold text-primary">{multiplier}</span>
        </div>

        {price && (
          <div className="flex justify-between items-center text-sm pt-2 border-t border-border/30">
            <span className="text-muted-foreground">Price</span>
            <span className="font-display font-bold text-lg text-accent">{price}</span>
          </div>
        )}

        {onBuy && (
          <Button
            variant="hero"
            size="lg"
            className="w-full mt-4 gap-2"
            onClick={onBuy}
            disabled={disabled}
          >
            {disabled ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            {disabled ? "Processing..." : "Buy NFT"}
          </Button>
        )}
      </div>
    </motion.div>
  );
};
