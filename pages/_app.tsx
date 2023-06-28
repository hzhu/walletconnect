import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ConnectButton } from '@rainbow-me/rainbowkit';

import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig, type Chain } from "wagmi";

import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import {
  metaMaskWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";

export const SUPPORTED_CHAINS: Chain[] = [mainnet, polygon, arbitrum];

const providers = [
  jsonRpcProvider({
    priority: 0,
    rpc: (chain: Chain) => {
      switch (chain.id) {
        case 1:
          return {
            http: "https://eth-mainnet.g.alchemy.com/v2/ZuYcmtAsk-Cpoq9CSnRJIUsNeXPxSS2v",
          };
        case 137:
          return {
            http: "https://polygon-mainnet.g.alchemy.com/v2/2ZulmRPm8Kklt6G--5tqJn50WOP5lQCt",
          };
        default:
          return null;
      }
    },
  }),
  publicProvider({ priority: 2 }),
];

const { chains, provider } = configureChains(SUPPORTED_CHAINS, providers);

const projectId = "79ca859045a661287f06fcf4b8aa3ecf";

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({ chains, shimDisconnect: true, projectId }),
      trustWallet({ chains, shimDisconnect: true, projectId }),
      walletConnectWallet({ chains, projectId }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <RainbowKitProvider
            chains={chains}
            appInfo={{
              appName: "demo",
            }}
          >
            <ConnectButton />
            <Component {...pageProps} />
          </RainbowKitProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}
