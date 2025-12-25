import { useReadContract, useReadContracts } from "wagmi";
import { CONTRACTS, NXP_PRICE_USD } from "@/lib/web3/config";
import { NFT_MINER_ABI } from "@/lib/web3/abis";
import { useWallet } from "./useWallet";
import { formatUnits } from "viem";

export interface UserNFT {
  tokenId: bigint;
  nftType: number;
  miningPower: bigint;
  isStaked: boolean;
}

const NFT_TYPE_NAMES = ["Tree", "Diamond", "Carbon"] as const;

export const useNFTMiner = () => {
  const { address } = useWallet();

  // Get user's NFTs
  const { data: userNFTs, refetch: refetchUserNFTs, isLoading } = useReadContract({
    address: CONTRACTS.NFT_MINER,
    abi: NFT_MINER_ABI,
    functionName: "getUserNFTs",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Get NFT balance
  const { data: nftBalance } = useReadContract({
    address: CONTRACTS.NFT_MINER,
    abi: NFT_MINER_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Helper to get pending reward for a token
  const usePendingReward = (tokenId: bigint | undefined) => {
    const { data } = useReadContract({
      address: CONTRACTS.NFT_MINER,
      abi: NFT_MINER_ABI,
      functionName: "getPendingReward",
      args: tokenId !== undefined ? [tokenId] : undefined,
      query: {
        enabled: tokenId !== undefined,
      },
    });

    return data ? formatUnits(data, 18) : "0";
  };

  // Helper to get mining rate for a token
  const useMiningRate = (tokenId: bigint | undefined) => {
    const { data } = useReadContract({
      address: CONTRACTS.NFT_MINER,
      abi: NFT_MINER_ABI,
      functionName: "getMiningRate",
      args: tokenId !== undefined ? [tokenId] : undefined,
      query: {
        enabled: tokenId !== undefined,
      },
    });

    return data ? formatUnits(data, 18) : "0";
  };

  // Helper to get mining power for a token
  const useMiningPower = (tokenId: bigint | undefined) => {
    const { data } = useReadContract({
      address: CONTRACTS.NFT_MINER,
      abi: NFT_MINER_ABI,
      functionName: "getMiningPower",
      args: tokenId !== undefined ? [tokenId] : undefined,
      query: {
        enabled: tokenId !== undefined,
      },
    });

    return data ? formatUnits(data, 18) : "0";
  };

  // Format NFT data for display
  const formattedNFTs = (userNFTs || []).map((nft: UserNFT) => ({
    tokenId: nft.tokenId,
    id: `NXP-${nft.tokenId.toString()}`,
    type: NFT_TYPE_NAMES[nft.nftType] || "Unknown",
    nftType: nft.nftType,
    miningPower: formatUnits(nft.miningPower, 18),
    isStaked: nft.isStaked,
  }));

  const activeNFTs = formattedNFTs.filter((nft) => nft.isStaked);
  const inactiveNFTs = formattedNFTs.filter((nft) => !nft.isStaked);

  return {
    userNFTs: formattedNFTs,
    activeNFTs,
    inactiveNFTs,
    nftBalance: nftBalance ? Number(nftBalance) : 0,
    usePendingReward,
    useMiningRate,
    useMiningPower,
    refetchUserNFTs,
    isLoading,
  };
};
