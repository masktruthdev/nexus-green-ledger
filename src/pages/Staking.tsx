import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/common/ParticleBackground";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GlassCard } from "@/components/common/GlassCard";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { Button } from "@/components/ui/button";
import { Coins, TrendingUp, Wallet, Clock, Lock, Gift } from "lucide-react";
import { toast } from "sonner";

import treeNFT from "@/assets/TREE-NFT.png";

// Mock data - in production this would come from smart contract
const stakingData = {
  activeNFTs: 3,
  dailyReward: "12.5 NXP",
  monthlyReward: "375 NXP",
  totalAccumulated: "1,250 NXP",
  claimableReward: "125.5 NXP",
  nextClaimDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  unstakeDate: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000), // 3 years
};

const stakedNFTs = [
  { id: "NXP-5072", type: "Tree", image: treeNFT, reward: "4.2 NXP/day" },
  { id: "NXP-5073", type: "Tree", image: treeNFT, reward: "4.2 NXP/day" },
  { id: "NXP-5074", type: "Tree", image: treeNFT, reward: "4.1 NXP/day" },
];

const Staking = () => {
  const [isClaimEnabled] = useState(false);

  // Smart Contract Functions
  const handleStakeNFT = (tokenId: string) => {
    // TODO: Bind to stakeNFT(tokenId) ABI
    console.log(`stakeNFT("${tokenId}") - Ready to bind ABI`);
    toast.success(`Staking NFT ${tokenId}...`);
  };

  const handleUnstakeNFT = (tokenId: string) => {
    // TODO: Bind to unstakeNFT(tokenId) ABI
    console.log(`unstakeNFT("${tokenId}") - Ready to bind ABI`);
    toast.info("Unstaking requires 3-year lock period to complete.");
  };

  const handleClaimReward = (tokenId: string) => {
    // TODO: Bind to claimReward(tokenId) ABI
    console.log(`claimReward("${tokenId}") - Ready to bind ABI`);
    if (!isClaimEnabled) {
      toast.error("Claim not available yet. Please wait for countdown.");
      return;
    }
    toast.success("Claiming rewards...");
  };

  const handleSellReward = () => {
    // TODO: Implement sell reward functionality
    toast.info("Sell reward feature coming soon!");
  };

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <SectionHeader
            label="Staking Dashboard"
            title="Stake & Earn NXP"
            subtitle="Stake your NFTs to earn continuous NXP token rewards from the mining pool."
          />

          {/* Stats Overview */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Wallet, label: "Active NFTs", value: stakingData.activeNFTs, color: "primary" },
              { icon: TrendingUp, label: "Daily Reward", value: stakingData.dailyReward, color: "primary" },
              { icon: Coins, label: "Monthly Reward", value: stakingData.monthlyReward, color: "accent" },
              { icon: Gift, label: "Total Accumulated", value: stakingData.totalAccumulated, color: "accent" },
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
              
              <div className="grid sm:grid-cols-2 gap-4">
                {stakedNFTs.map((nft, index) => (
                  <motion.div
                    key={nft.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <GlassCard className="p-4" animate={false}>
                      <div className="flex gap-4">
                        <img
                          src={nft.image}
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
                              Earning: <span className="text-primary">{nft.reward}</span>
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUnstakeNFT(nft.id)}
                            className="mt-2"
                          >
                            <Lock className="w-3 h-3 mr-1" />
                            Unstake
                          </Button>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
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
                      {stakingData.claimableReward}
                    </p>
                  </div>
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={() => handleClaimReward("all")}
                    disabled={!isClaimEnabled}
                  >
                    {isClaimEnabled ? "Claim Reward" : "Claim Locked"}
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
                  <p className="text-sm text-muted-foreground mb-4">
                    Convert your accumulated NXP rewards to stablecoins.
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
                    targetDate={stakingData.nextClaimDate}
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
                    targetDate={stakingData.unstakeDate}
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
