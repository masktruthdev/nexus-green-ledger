import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { BSC_CHAIN_ID } from "@/lib/web3/config";
import { useCallback } from "react";
import { toast } from "sonner";

export const useWallet = () => {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const isCorrectChain = chainId === BSC_CHAIN_ID;

  const connectWallet = useCallback(async () => {
    try {
      const injectedConnector = connectors.find((c) => c.id === "injected");
      if (injectedConnector) {
        connect({ connector: injectedConnector });
      } else if (connectors.length > 0) {
        connect({ connector: connectors[0] });
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      toast.error("Failed to connect wallet");
    }
  }, [connect, connectors]);

  const disconnectWallet = useCallback(() => {
    disconnect();
    toast.success("Wallet disconnected");
  }, [disconnect]);

  const switchToBSC = useCallback(async () => {
    try {
      switchChain({ chainId: BSC_CHAIN_ID });
    } catch (error) {
      console.error("Failed to switch chain:", error);
      toast.error("Please switch to BSC network manually");
    }
  }, [switchChain]);

  // Auto-prompt switch if on wrong chain
  const ensureCorrectChain = useCallback(async () => {
    if (isConnected && !isCorrectChain) {
      toast.warning("Please switch to BSC network");
      await switchToBSC();
      return false;
    }
    return isCorrectChain;
  }, [isConnected, isCorrectChain, switchToBSC]);

  return {
    address,
    isConnected,
    isCorrectChain,
    isPending,
    connectWallet,
    disconnectWallet,
    switchToBSC,
    ensureCorrectChain,
    chainId,
  };
};
