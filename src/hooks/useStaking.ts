import { useReadContract, useReadContracts, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACTS, NXP_PRICE_USD } from "@/lib/web3/config";
import { STAKING_ABI, NFT_MINER_ABI } from "@/lib/web3/abis";
import { useWallet } from "./useWallet";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";
import { formatUnits } from "viem";

// Claim cooldown: 30 days in seconds
const CLAIM_COOLDOWN = 30 * 24 * 60 * 60;
// Unstake lock: 3 years in seconds
const UNSTAKE_LOCK = 3 * 365 * 24 * 60 * 60;

export const useStaking = () => {
  const { address, isConnected, ensureCorrectChain } = useWallet();
  const [pendingAction, setPendingAction] = useState<string | null>(null);

  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Get staked NFTs for user
  const { data: stakedNFTs, refetch: refetchStakedNFTs } = useReadContract({
    address: CONTRACTS.STAKING,
    abi: STAKING_ABI,
    functionName: "getStakedNFTs",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Handle success
  useEffect(() => {
    if (isSuccess && pendingAction) {
      toast.success(`${pendingAction} successful!`);
      setPendingAction(null);
      refetchStakedNFTs();
      reset();
    }
  }, [isSuccess, pendingAction, refetchStakedNFTs, reset]);

  // Handle error
  useEffect(() => {
    if (error) {
      console.error("Staking error:", error);
      toast.error(error.message?.split("\n")[0] || "Transaction failed");
      setPendingAction(null);
      reset();
    }
  }, [error, reset]);

  const stakeNFT = useCallback(
    async (tokenId: bigint) => {
      if (!isConnected) {
        toast.error("Please connect your wallet first");
        return;
      }

      const isCorrect = await ensureCorrectChain();
      if (!isCorrect) return;

      setPendingAction("Stake NFT");

      try {
        writeContract({
          address: CONTRACTS.STAKING,
          abi: STAKING_ABI,
          functionName: "stakeNFT",
          args: [tokenId],
        });
        toast.info("Staking NFT...");
      } catch (err) {
        console.error("Stake NFT error:", err);
        setPendingAction(null);
      }
    },
    [isConnected, ensureCorrectChain, writeContract]
  );

  const unstakeNFT = useCallback(
    async (tokenId: bigint) => {
      if (!isConnected) {
        toast.error("Please connect your wallet first");
        return;
      }

      const isCorrect = await ensureCorrectChain();
      if (!isCorrect) return;

      setPendingAction("Unstake NFT");

      try {
        writeContract({
          address: CONTRACTS.STAKING,
          abi: STAKING_ABI,
          functionName: "unstakeNFT",
          args: [tokenId],
        });
        toast.info("Unstaking NFT...");
      } catch (err) {
        console.error("Unstake NFT error:", err);
        setPendingAction(null);
      }
    },
    [isConnected, ensureCorrectChain, writeContract]
  );

  const claimReward = useCallback(
    async (tokenId: bigint) => {
      if (!isConnected) {
        toast.error("Please connect your wallet first");
        return;
      }

      const isCorrect = await ensureCorrectChain();
      if (!isCorrect) return;

      setPendingAction("Claim Reward");

      try {
        writeContract({
          address: CONTRACTS.STAKING,
          abi: STAKING_ABI,
          functionName: "claimReward",
          args: [tokenId],
        });
        toast.info("Claiming reward...");
      } catch (err) {
        console.error("Claim reward error:", err);
        setPendingAction(null);
      }
    },
    [isConnected, ensureCorrectChain, writeContract]
  );

  // Helper to get staking info for a specific token
  const useStakingInfo = (tokenId: bigint | undefined) => {
    const { data } = useReadContract({
      address: CONTRACTS.STAKING,
      abi: STAKING_ABI,
      functionName: "getStakingInfo",
      args: tokenId !== undefined ? [tokenId] : undefined,
      query: {
        enabled: tokenId !== undefined,
      },
    });

    if (!data) return null;

    const stakedAt = Number(data.stakedAt);
    const lastClaimAt = Number(data.lastClaimAt);
    const now = Math.floor(Date.now() / 1000);

    const nextClaimTime = lastClaimAt + CLAIM_COOLDOWN;
    const unstakeTime = stakedAt + UNSTAKE_LOCK;

    const canClaim = now >= nextClaimTime;
    const canUnstake = now >= unstakeTime;

    return {
      stakedAt: new Date(stakedAt * 1000),
      lastClaimAt: new Date(lastClaimAt * 1000),
      pendingReward: formatUnits(data.pendingReward, 18),
      pendingRewardUSD: (Number(formatUnits(data.pendingReward, 18)) * NXP_PRICE_USD).toFixed(2),
      totalClaimed: formatUnits(data.totalClaimed, 18),
      nextClaimDate: new Date(nextClaimTime * 1000),
      unstakeDate: new Date(unstakeTime * 1000),
      canClaim,
      canUnstake,
    };
  };

  return {
    stakedNFTs: stakedNFTs || [],
    stakeNFT,
    unstakeNFT,
    claimReward,
    useStakingInfo,
    isPending: isPending || isConfirming,
    refetchStakedNFTs,
  };
};
