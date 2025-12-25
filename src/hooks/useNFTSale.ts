import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther, zeroAddress } from "viem";
import { CONTRACTS, NFT_TYPES } from "@/lib/web3/config";
import { NFT_SALE_ABI } from "@/lib/web3/abis";
import { useWallet } from "./useWallet";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";

type NFTType = keyof typeof NFT_TYPES;

export const useNFTSale = () => {
  const { address, isConnected, ensureCorrectChain } = useWallet();
  const [pendingTxType, setPendingTxType] = useState<NFTType | null>(null);

  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  // Get NFT prices from contract
  const { data: treePriceBN } = useReadContract({
    address: CONTRACTS.NFT_SALE,
    abi: NFT_SALE_ABI,
    functionName: "getNFTPrice",
    args: [NFT_TYPES.TREE],
  });

  const { data: diamondPriceBN } = useReadContract({
    address: CONTRACTS.NFT_SALE,
    abi: NFT_SALE_ABI,
    functionName: "getNFTPrice",
    args: [NFT_TYPES.DIAMOND],
  });

  const { data: carbonPriceBN } = useReadContract({
    address: CONTRACTS.NFT_SALE,
    abi: NFT_SALE_ABI,
    functionName: "getNFTPrice",
    args: [NFT_TYPES.CARBON],
  });

  // Handle success
  useEffect(() => {
    if (isSuccess && pendingTxType) {
      toast.success(`Successfully purchased ${pendingTxType} NFT!`);
      setPendingTxType(null);
      reset();
    }
  }, [isSuccess, pendingTxType, reset]);

  // Handle error
  useEffect(() => {
    if (error) {
      console.error("Transaction error:", error);
      toast.error(error.message?.split("\n")[0] || "Transaction failed");
      setPendingTxType(null);
      reset();
    }
  }, [error, reset]);

  const buyNFT = useCallback(
    async (nftType: NFTType, referralAddress?: string) => {
      if (!isConnected) {
        toast.error("Please connect your wallet first");
        return;
      }

      const isCorrect = await ensureCorrectChain();
      if (!isCorrect) return;

      const typeId = NFT_TYPES[nftType];
      let price: bigint | undefined;

      switch (nftType) {
        case "TREE":
          price = treePriceBN;
          break;
        case "DIAMOND":
          price = diamondPriceBN;
          break;
        case "CARBON":
          price = carbonPriceBN;
          break;
      }

      if (!price) {
        toast.error("Unable to fetch NFT price. Please try again.");
        return;
      }

      setPendingTxType(nftType);

      try {
        const refAddress = referralAddress && referralAddress.startsWith("0x") 
          ? (referralAddress as `0x${string}`) 
          : zeroAddress;

        if (refAddress === zeroAddress) {
          writeContract({
            address: CONTRACTS.NFT_SALE,
            abi: NFT_SALE_ABI,
            functionName: "buyNFTWithoutReferral",
            args: [typeId],
            value: price,
          });
        } else {
          writeContract({
            address: CONTRACTS.NFT_SALE,
            abi: NFT_SALE_ABI,
            functionName: "buyNFT",
            args: [typeId, refAddress],
            value: price,
          });
        }

        toast.info(`Initiating purchase for ${nftType} NFT...`);
      } catch (err) {
        console.error("Buy NFT error:", err);
        setPendingTxType(null);
      }
    },
    [isConnected, ensureCorrectChain, treePriceBN, diamondPriceBN, carbonPriceBN, writeContract]
  );

  return {
    buyNFT,
    isPending: isPending || isConfirming,
    isSuccess,
    prices: {
      TREE: treePriceBN,
      DIAMOND: diamondPriceBN,
      CARBON: carbonPriceBN,
    },
  };
};
