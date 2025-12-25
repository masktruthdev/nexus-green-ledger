import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/common/ParticleBackground";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GlassCard } from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Copy, 
  Check, 
  Wallet, 
  TrendingUp, 
  Calendar, 
  Coins,
  CheckCircle2,
  XCircle,
  Loader2
} from "lucide-react";
import { toast } from "sonner";

import { useWallet } from "@/hooks/useWallet";
import { useNFTMiner } from "@/hooks/useNFTMiner";
import { useRewardPool } from "@/hooks/useRewardPool";
import { NXP_PRICE_USD } from "@/lib/web3/config";

import treeNFT from "@/assets/TREE-NFT.png";
import diamondNFT from "@/assets/DIAMOND-NFT.png";
import carbonNFT from "@/assets/CARBON-NFT.png";

const NFT_IMAGES: Record<string, string> = {
  Tree: treeNFT,
  Diamond: diamondNFT,
  Carbon: carbonNFT,
};

const Dashboard = () => {
  const [copied, setCopied] = useState(false);
  
  const { address, isConnected, connectWallet } = useWallet();
  const { activeNFTs, inactiveNFTs, isLoading: isNFTsLoading } = useNFTMiner();
  const { 
    totalEarning, 
    totalEarningUSD,
    dailyEarning, 
    dailyEarningUSD,
    monthlyEarning,
    monthlyEarningUSD,
    referralEarning,
    referralEarningUSD 
  } = useRewardPool();

  // Generate referral link from wallet address
  const referralLink = useMemo(() => {
    if (address) {
      return `https://nexus.protocol/ref/${address}`;
    }
    return "https://nexus.protocol/ref/connect-wallet";
  }, [address]);

  // Use on-chain data or fallback to demo data
  const dashboardData = {
    referralLink,
    totalEarnings: totalEarning ? `${totalEarning} NXP` : "5,250 NXP",
    totalEarningsUSD: totalEarningUSD ? `$${totalEarningUSD}` : "$294.00",
    dailyEarnings: dailyEarning ? `${dailyEarning} NXP` : "42.5 NXP",
    dailyEarningsUSD: dailyEarningUSD ? `$${dailyEarningUSD}` : "$2.38",
    monthlyEarnings: monthlyEarning ? `${monthlyEarning} NXP` : "1,275 NXP",
    monthlyEarningsUSD: monthlyEarningUSD ? `$${monthlyEarningUSD}` : "$71.40",
    referralBonus: referralEarning ? `${referralEarning} NXP` : "525 NXP",
    referralBonusUSD: referralEarningUSD ? `$${referralEarningUSD}` : "$29.40",
  };

  // Use on-chain NFTs or fallback to demo data
  const displayActiveNFTs = activeNFTs.length > 0 ? activeNFTs.map(nft => ({
    id: nft.id,
    type: nft.type,
    image: NFT_IMAGES[nft.type] || treeNFT,
    status: "staked",
  })) : [
    { id: "NXP-5072", type: "Tree", image: treeNFT, status: "staked" },
    { id: "NXP-5073", type: "Tree", image: treeNFT, status: "staked" },
    { id: "NXP-3008", type: "Diamond", image: diamondNFT, status: "staked" },
  ];

  const displayInactiveNFTs = inactiveNFTs.length > 0 ? inactiveNFTs.map(nft => ({
    id: nft.id,
    type: nft.type,
    image: NFT_IMAGES[nft.type] || treeNFT,
    status: "unstaked",
  })) : [
    { id: "NXP-5074", type: "Tree", image: treeNFT, status: "unstaked" },
    { id: "NXP-6890", type: "Carbon", image: carbonNFT, status: "unstaked" },
  ];

  const handleCopyReferral = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      connectWallet();
      return;
    }
    
    try {
      await navigator.clipboard.writeText(dashboardData.referralLink);
      setCopied(true);
      toast.success("Referral link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleStakeNow = () => {
    toast.info("Redirecting to staking...");
    window.location.href = "/staking";
  };

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <SectionHeader
            label="Your Profile"
            title="Dashboard"
            subtitle="Track your earnings, referrals, and NFT collection in one place."
          />

          {/* Referral Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12"
          >
            <GlassCard className="p-6" glow animate={false}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold text-lg mb-1">
                    Your Referral Link
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Share and earn 5% bonus on every referred purchase
                  </p>
                </div>
                <div className="flex gap-2 flex-1 md:max-w-md">
                  <Input
                    value={dashboardData.referralLink}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant={copied ? "outline" : "default"}
                    onClick={handleCopyReferral}
                    className="shrink-0"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Earnings Grid */}
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { 
                icon: Wallet, 
                label: "Total Earnings", 
                value: dashboardData.totalEarnings, 
                subValue: dashboardData.totalEarningsUSD,
                color: "primary" 
              },
              { 
                icon: Calendar, 
                label: "Daily Earnings", 
                value: dashboardData.dailyEarnings, 
                subValue: dashboardData.dailyEarningsUSD,
                color: "primary" 
              },
              { 
                icon: TrendingUp, 
                label: "Monthly Earnings", 
                value: dashboardData.monthlyEarnings, 
                subValue: dashboardData.monthlyEarningsUSD,
                color: "accent" 
              },
              { 
                icon: Coins, 
                label: "Referral Bonus", 
                value: dashboardData.referralBonus, 
                subValue: dashboardData.referralBonusUSD,
                color: "accent" 
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <GlassCard className="p-5" animate={false}>
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      stat.color === "primary" ? "bg-primary/20" : "bg-accent/20"
                    }`}>
                      <stat.icon className={`w-6 h-6 ${
                        stat.color === "primary" ? "text-primary" : "text-accent"
                      }`} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {stat.label}
                      </p>
                      <p className={`font-display font-bold text-xl mt-1 ${
                        stat.color === "primary" ? "text-primary" : "text-accent"
                      }`}>
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ≈ {stat.subValue}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* NFT Collection */}
          <div className="mt-16 space-y-8">
            {/* Active NFTs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-6 h-6 text-primary" />
                <h3 className="font-display font-semibold text-xl">Active NFTs</h3>
                <span className="px-2 py-1 glass-panel rounded-full text-xs font-display text-primary">
                  {displayActiveNFTs.length} Staked
                </span>
              </div>
              
              {isNFTsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {displayActiveNFTs.map((nft, index) => (
                    <motion.div
                      key={nft.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <GlassCard className="p-3 group" animate={false}>
                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
                          <img
                            src={nft.image}
                            alt={nft.type}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute top-2 right-2 px-2 py-0.5 bg-primary/90 rounded-full text-[10px] font-display font-semibold text-primary-foreground uppercase">
                            Staked
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs text-primary font-display uppercase tracking-wider">
                            {nft.type}
                          </span>
                          <p className="font-display font-semibold text-sm">{nft.id}</p>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Inactive NFTs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="w-6 h-6 text-muted-foreground" />
                <h3 className="font-display font-semibold text-xl text-muted-foreground">
                  Inactive NFTs
                </h3>
                <span className="px-2 py-1 glass-panel rounded-full text-xs font-display text-muted-foreground">
                  {displayInactiveNFTs.length} Unstaked
                </span>
              </div>
              
              {isNFTsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {displayInactiveNFTs.map((nft, index) => (
                    <motion.div
                      key={nft.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <GlassCard className="p-3 group opacity-60 hover:opacity-100 transition-opacity" animate={false}>
                        <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3 grayscale group-hover:grayscale-0 transition-all">
                          <img
                            src={nft.image}
                            alt={nft.type}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute top-2 right-2 px-2 py-0.5 bg-muted rounded-full text-[10px] font-display font-semibold text-muted-foreground uppercase">
                            Unstaked
                          </div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs text-muted-foreground font-display uppercase tracking-wider">
                            {nft.type}
                          </span>
                          <p className="font-display font-semibold text-sm">{nft.id}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-3 text-xs"
                          onClick={handleStakeNow}
                        >
                          Stake Now
                        </Button>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
