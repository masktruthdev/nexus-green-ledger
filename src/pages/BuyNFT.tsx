import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/common/ParticleBackground";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GlassCard } from "@/components/common/GlassCard";
import { NFTCard } from "@/components/nft/NFTCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Gift } from "lucide-react";
import { toast } from "sonner";
import { useNFTSale } from "@/hooks/useNFTSale";
import { useWallet } from "@/hooks/useWallet";
import { NFT_PRICES_USD } from "@/lib/web3/config";

import treeNFT from "@/assets/TREE-NFT.png";
import diamondNFT from "@/assets/DIAMOND-NFT.png";
import carbonNFT from "@/assets/CARBON-NFT.png";

const nftCollection = [
  {
    name: "Tree NFT",
    image: treeNFT,
    rarity: "Common",
    multiplier: "1x",
    supply: "2,070,000",
    price: `$${NFT_PRICES_USD.TREE}`,
    type: "TREE" as const,
  },
  {
    name: "Diamond NFT",
    image: diamondNFT,
    rarity: "Rare",
    multiplier: "5x",
    supply: "20,000",
    price: `$${NFT_PRICES_USD.DIAMOND}`,
    type: "DIAMOND" as const,
  },
  {
    name: "Carbon NFT",
    image: carbonNFT,
    rarity: "Legendary",
    multiplier: "10x",
    supply: "10,000",
    price: `$${NFT_PRICES_USD.CARBON}`,
    type: "CARBON" as const,
  },
];

const BuyNFT = () => {
  const [referralCode, setReferralCode] = useState("");
  const [referralApplied, setReferralApplied] = useState(false);
  
  const { buyNFT, isPending } = useNFTSale();
  const { isConnected, connectWallet } = useWallet();

  // Smart Contract Function: buyNFT(nftType, referralCode)
  const handleBuyNFT = async (nftType: "TREE" | "DIAMOND" | "CARBON") => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      connectWallet();
      return;
    }
    
    await buyNFT(nftType, referralApplied ? referralCode : undefined);
  };

  const handleApplyReferral = () => {
    if (referralCode.trim()) {
      // Validate if it's a valid address format
      if (referralCode.startsWith("0x") && referralCode.length === 42) {
        setReferralApplied(true);
        toast.success("Referral code applied!");
      } else {
        toast.error("Please enter a valid wallet address");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <SectionHeader
            label="Marketplace"
            title="Buy Nexus NFTs"
            subtitle="Choose your NFT tier and start earning NXP token rewards. Each NFT represents real environmental impact."
          />

          {/* Referral Code Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 max-w-lg mx-auto"
          >
            <GlassCard className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Gift className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">Referral Bonus</h3>
                  <p className="text-sm text-muted-foreground">
                    Enter a referral wallet address to get 5% bonus
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Input
                  placeholder="Enter referral wallet address (0x...)"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  disabled={referralApplied}
                  className="flex-1 font-mono text-sm"
                />
                <Button
                  variant={referralApplied ? "outline" : "default"}
                  onClick={handleApplyReferral}
                  disabled={referralApplied}
                  className="gap-2"
                >
                  {referralApplied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Applied
                    </>
                  ) : (
                    "Apply"
                  )}
                </Button>
              </div>
            </GlassCard>
          </motion.div>

          {/* NFT Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nftCollection.map((nft, index) => (
              <motion.div
                key={nft.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <NFTCard
                  {...nft}
                  onBuy={() => handleBuyNFT(nft.type)}
                  floating={false}
                  disabled={isPending}
                />
              </motion.div>
            ))}
          </div>

          {/* Info Cards */}
          <div className="mt-20 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Instant Staking",
                description: "All purchased NFTs are automatically eligible for staking rewards.",
              },
              {
                title: "Real Impact",
                description: "Each NFT purchase directly funds verified environmental projects.",
              },
              {
                title: "Lifetime Rewards",
                description: "Earn NXP tokens continuously as long as you hold your NFT.",
              },
            ].map((info, index) => (
              <GlassCard key={info.title} delay={index * 0.1}>
                <h4 className="font-display font-semibold text-lg mb-2 text-primary">
                  {info.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {info.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BuyNFT;
