import { createConfig, http } from "wagmi";
import { bsc } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

// Project ID from WalletConnect
const projectId = "14a6012ffc42d98b14cc3637e1c3c924";

// Contract Addresses (Immutable)
export const CONTRACTS = {
  INTERNAL_BUYBACK_POOL: "0xfD21218DeA13DCA42762E0F82eF84f5094Db5d97" as `0x${string}`,
  NXP_TOKEN: "0x9C9Ab1B8F9B59B09AA0B3a90beb76e1B305306Ff" as `0x${string}`,
  NFT_MINER: "0x89B96c43443a50C686A1891B2cE46f14D3E86959" as `0x${string}`,
  NFT_SALE: "0xA151A57040F364c97Bf1B0925CE02122b5b990d9" as `0x${string}`,
  REWARD_POOL: "0x441720F4111FD0fd0C6b598D5a642eEf4FD3B0Cf" as `0x${string}`,
  STAKING: "0x2e200Df03d7Ba49f14F116A805A9Ab442c834a01" as `0x${string}`,
} as const;

// NFT Price Configuration (USD peg)
export const NFT_PRICES_USD = {
  TREE: 10,
  DIAMOND: 100,
  CARBON: 1000,
} as const;

// NXP Token Price (USD)
export const NXP_PRICE_USD = 0.056;

// NFT Type Enum
export const NFT_TYPES = {
  TREE: 0,
  DIAMOND: 1,
  CARBON: 2,
} as const;

// Wagmi Config
export const wagmiConfig = createConfig({
  chains: [bsc],
  connectors: [
    injected(),
    walletConnect({ projectId }),
  ],
  transports: {
    [bsc.id]: http("https://bsc-dataseed1.binance.org"),
  },
});

// BSC Chain Config
export const BSC_CHAIN_ID = 56;
