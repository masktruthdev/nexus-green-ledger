import { useMemo } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/common/ParticleBackground";
import { GlassCard } from "@/components/common/GlassCard";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { Button } from "@/components/ui/button";
import { Coins, TrendingUp, Wallet, Clock, Lock, Gift, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { useWallet } from "@/hooks/useWallet";
import { useStaking } from "@/hooks/useStaking";
import { useNFTMiner } from "@/hooks/useNFTMiner";
import { useRewardPool } from "@/hooks/useRewardPool";
import { NXP_PRICE_USD } from "@/lib/web3/config";

import treeNFT from "@/assets/TREE-NFT.png";
import diamondNFT from "@/assets/DIAMOND-NFT.png";
import carbonNFT from "@/assets/CARBON-NFT.png";
import stakingVisual from "@/assets/nexus-staking.jpeg";

const NFT_IMAGES: Record<string, string> = {
  Tree: treeNFT,
  Diamond: diamondNFT,
  Carbon: carbonNFT,
};

// Claim cooldown: 30 days
const CLAIM_COOLDOWN_MS = 30 * 24 * 60 * 60 * 1000;
// Unstake lock: 3 years
const UNSTAKE_LOCK_MS = 3 * 365 * 24 * 60 * 60 * 1000;

const Staking = () => {
  const { isConnected, address, connectWallet } = useWallet();
  const { stakedNFTs, unstakeNFT, claimReward, isPending: isStakingPending } = useStaking();
  const { activeNFTs, isLoading: isNFTsLoading } = useNFTMiner();
  const { 
    userReward, 
    dailyEarning, 
    monthlyEarning, 
    totalEarning,
    claimReward: claimPoolReward,
    isPending: isRewardPending 
  } = useRewardPool();

  // Calculate countdown dates based on first staked NFT (simplified)
  const countdownDates = useMemo(() => {
    const now = Date.now();
    // These would come from contract in production
    // For now, using placeholder countdown
    return {
      nextClaimDate: new Date(now + CLAIM_COOLDOWN_MS),
      unstakeDate: new Date(now + UNSTAKE_LOCK_MS),
    };
  }, []);

  const isClaimEnabled = useMemo(() => {
    // In production, check against actual lastClaimAt from contract
    return parseFloat(userReward) > 0;
  }, [userReward]);

  // Smart Contract Functions
  const handleUnstakeNFT = async (tokenId: string) => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      connectWallet();
      return;
    }
    
    // unstakeNFT(tokenId) - Bind to smart contract
    try {
      await unstakeNFT(BigInt(tokenId.replace("NXP-", "")));
    } catch (error) {
      toast.info("Unstaking requires 3-year lock period to complete.");
    }
  };

  const handleClaimReward = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      connectWallet();
      return;
    }

    if (!isClaimEnabled) {
      toast.error("No rewards available to claim.");
      return;
    }

    await claimPoolReward();
  };

  const handleSellReward = () => {
    // Sell reward at fixed price: 1 NXP = $0.056
    toast.info(`Sell rate: 1 NXP = $${NXP_PRICE_USD}`);
  };

  // Use on-chain data or fallback to mock data for display
  const displayActiveNFTs = activeNFTs.length > 0 ? activeNFTs : [
    { id: "NXP-5072", type: "Tree", reward: "4.2 NXP/day" },
    { id: "NXP-5073", type: "Tree", reward: "4.2 NXP/day" },
    { id: "NXP-5074", type: "Tree", reward: "4.1 NXP/day" },
  ];

  const stakingStats = {
    activeNFTs: activeNFTs.length || 3,
    dailyReward: dailyEarning ? `${dailyEarning} NXP` : "12.5 NXP",
    monthlyReward: monthlyEarning ? `${monthlyEarning} NXP` : "375 NXP",
    totalAccumulated: totalEarning ? `${totalEarning} NXP` : "1,250 NXP",
    claimableReward: userReward ? `${userReward} NXP` : "125.5 NXP",
  };

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header with Visual */}
          <div className="relative mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-2xl overflow-hidden"
            >
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9]">
                <img
                  src={stakingVisual}
                  alt="Nexus Staking"
                  className="w-full h-full object-contain md:object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-background/50" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-4">
                  <span className="inline-block px-4 py-1.5 glass-panel rounded-full text-xs font-display font-semibold tracking-widest uppercase text-primary mb-4">
                    Staking Dashboard
                  </span>
                  <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
                    <span className="gradient-text">Stake & Earn NXP</span>
                  </h1>
                  <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
                    Stake your NFTs to earn continuous NXP token rewards from the mining pool.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Wallet, label: "Active NFTs", value: stakingStats.activeNFTs, color: "primary" },
              { icon: TrendingUp, label: "Daily Reward", value: stakingStats.dailyReward, color: "primary" },
              { icon: Coins, label: "Monthly Reward", value: stakingStats.monthlyReward, color: "accent" },
              { icon: Gift, label: "Total Accumulated", value: stakingStats.totalAccumulated, color: "accent" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-5" animate={false}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      stat.color === "primary" ? "bg-primary/20" : "bg-accent/20"
                    }`}>
                      <stat.icon className={`w-5 h-5 ${
                        stat.color === "primary" ? "text-primary" : "text-accent"
                      }`} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">
                        {stat.label}
                      </p>
                      <p className={`font-display font-bold text-xl ${
                        stat.color === "primary" ? "text-primary" : "text-accent"
                      }`}>
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 grid lg:grid-cols-3 gap-8">
            {/* Left Column - Staked NFTs */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="font-display font-semibold text-xl">Your Staked NFTs</h3>
              
              {isNFTsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {displayActiveNFTs.map((nft, index) => (
                    <motion.div
                      key={nft.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <GlassCard className="p-4" animate={false}>
                        <div className="flex gap-4">
                          <img
                            src={NFT_IMAGES[nft.type] || treeNFT}
                            alt={nft.type}
                            className="w-20 h-28 object-cover rounded-lg"
                          />
                          <div className="flex-1 flex flex-col justify-between">
                            <div>
                              <span className="text-xs text-primary font-display uppercase tracking-wider">
                                {nft.type}
                              </span>
                              <h4 className="font-display font-semibold">{nft.id}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                Earning: <span className="text-primary">{nft.reward || "4.2 NXP/day"}</span>
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUnstakeNFT(nft.id)}
                              disabled={isStakingPending}
                              className="mt-2"
                            >
                              {isStakingPending ? (
                                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                              ) : (
                                <Lock className="w-3 h-3 mr-1" />
                              )}
                              Unstake
                            </Button>
                          </div>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Rewards & Countdowns */}
            <div className="space-y-6">
              {/* Claimable Reward */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <GlassCard className="p-6" glow animate={false}>
                  <h4 className="font-display font-semibold text-lg mb-4">
                    Claimable Reward
                  </h4>
                  <div className="text-center py-4 glass-panel rounded-xl mb-4">
                    <p className="font-display font-bold text-3xl text-primary text-glow">
                      {stakingStats.claimableReward}
                    </p>
                  </div>
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={handleClaimReward}
                    disabled={!isClaimEnabled || isRewardPending}
                  >
                    {isRewardPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Claiming...
                      </>
                    ) : isClaimEnabled ? (
                      "Claim Reward"
                    ) : (
                      "Claim Locked"
                    )}
                  </Button>
                </GlassCard>
              </motion.div>

              {/* Sell Reward */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <GlassCard className="p-6" animate={false}>
                  <h4 className="font-display font-semibold text-lg mb-4">
                    Sell Reward
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Convert your accumulated NXP rewards to stablecoins.
                  </p>
                  <p className="text-xs text-primary mb-4">
                    Rate: 1 NXP = ${NXP_PRICE_USD}
                  </p>
                  <Button
                    variant="gold"
                    size="lg"
                    className="w-full"
                    onClick={handleSellReward}
                  >
                    Sell NXP
                  </Button>
                </GlassCard>
              </motion.div>

              {/* Countdown - Claim */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <GlassCard className="p-6" animate={false}>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-primary" />
                    <h4 className="font-display font-semibold">Next Claim</h4>
                  </div>
                  <CountdownTimer
                    targetDate={countdownDates.nextClaimDate}
                    label="Claim available in"
                  />
                </GlassCard>
              </motion.div>

              {/* Countdown - Unstake */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <GlassCard className="p-6" animate={false}>
                  <div className="flex items-center gap-2 mb-4">
                    <Lock className="w-5 h-5 text-accent" />
                    <h4 className="font-display font-semibold">Unstake Lock</h4>
                  </div>
                  <CountdownTimer
                    targetDate={countdownDates.unstakeDate}
                    label="Unstake available in"
                  />
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Staking;
