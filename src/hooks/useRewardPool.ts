import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { CONTRACTS, NXP_PRICE_USD } from "@/lib/web3/config";
import { REWARD_POOL_ABI } from "@/lib/web3/abis";
import { useWallet } from "./useWallet";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";
import { formatUnits } from "viem";

export const useRewardPool = () => {
  const { address, isConnected, ensureCorrectChain } = useWallet();
  const [isClaiming, setIsClaiming] = useState(false);

  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Get user's pending reward
  const { data: userRewardBN, refetch: refetchUserReward } = useReadContract({
    address: CONTRACTS.REWARD_POOL,
    abi: REWARD_POOL_ABI,
    functionName: "getUserReward",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Get total earnings
  const { data: totalEarningBN, refetch: refetchTotalEarning } = useReadContract({
    address: CONTRACTS.REWARD_POOL,
    abi: REWARD_POOL_ABI,
    functionName: "getTotalEarning",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Get daily earnings
  const { data: dailyEarningBN } = useReadContract({
    address: CONTRACTS.REWARD_POOL,
    abi: REWARD_POOL_ABI,
    functionName: "getDailyEarning",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Get monthly earnings
  const { data: monthlyEarningBN } = useReadContract({
    address: CONTRACTS.REWARD_POOL,
    abi: REWARD_POOL_ABI,
    functionName: "getMonthlyEarning",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Get referral earnings
  const { data: referralEarningBN } = useReadContract({
    address: CONTRACTS.REWARD_POOL,
    abi: REWARD_POOL_ABI,
    functionName: "getReferralEarning",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Handle success
  useEffect(() => {
    if (isSuccess && isClaiming) {
      toast.success("Reward claimed successfully!");
      setIsClaiming(false);
      refetchUserReward();
      refetchTotalEarning();
      reset();
    }
  }, [isSuccess, isClaiming, refetchUserReward, refetchTotalEarning, reset]);

  // Handle error
  useEffect(() => {
    if (error) {
      console.error("Claim error:", error);
      toast.error(error.message?.split("\n")[0] || "Claim failed");
      setIsClaiming(false);
      reset();
    }
  }, [error, reset]);

  const claimReward = useCallback(async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    const isCorrect = await ensureCorrectChain();
    if (!isCorrect) return;

    setIsClaiming(true);

    try {
      writeContract({
        address: CONTRACTS.REWARD_POOL,
        abi: REWARD_POOL_ABI,
        functionName: "claimReward",
      });
      toast.info("Claiming reward...");
    } catch (err) {
      console.error("Claim error:", err);
      setIsClaiming(false);
    }
  }, [isConnected, ensureCorrectChain, writeContract]);

  // Format values
  const formatNXP = (value: bigint | undefined) => {
    if (!value) return "0";
    return parseFloat(formatUnits(value, 18)).toFixed(2);
  };

  const formatUSD = (value: bigint | undefined) => {
    if (!value) return "0.00";
    const nxpValue = parseFloat(formatUnits(value, 18));
    return (nxpValue * NXP_PRICE_USD).toFixed(2);
  };

  return {
    userReward: formatNXP(userRewardBN),
    userRewardUSD: formatUSD(userRewardBN),
    totalEarning: formatNXP(totalEarningBN),
    totalEarningUSD: formatUSD(totalEarningBN),
    dailyEarning: formatNXP(dailyEarningBN),
    dailyEarningUSD: formatUSD(dailyEarningBN),
    monthlyEarning: formatNXP(monthlyEarningBN),
    monthlyEarningUSD: formatUSD(monthlyEarningBN),
    referralEarning: formatNXP(referralEarningBN),
    referralEarningUSD: formatUSD(referralEarningBN),
    claimReward,
    isPending: isPending || isConfirming,
    refetchUserReward,
  };
};
