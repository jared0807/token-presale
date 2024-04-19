import React from "react";
import { WagmiProvider, createConfig, http, fallback } from "wagmi";
import { mainnet, fantom } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RainbowKitProvider,
  Locale,
  getDefaultConfig,
  darkTheme,
  Theme,
} from "@rainbow-me/rainbowkit";

import { useRouter } from "next/router";
import "@rainbow-me/rainbowkit/styles.css";

import merge from "lodash.merge";

interface Web3ProviderProps {
  children: React.ReactNode;
}

const config = getDefaultConfig({
  appName: "tokenpresale",
  appDescription:
    "At tokenpresale, our mission is to completely change the way people trade cryptocurrency.",
  appUrl: "https://app.tokenpresale.network/",
  appIcon:
    "https://app.tokenpresale.network/_next/static/media/tokenpresalelogo.3021877d.svg",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  chains: [fantom],
  ssr: true, // If your dApp uses server side rendering (SSR)
  transports: {
    [fantom.id]: fallback([
      http(`https://fantom-rpc.publicnode.com`),
      // http(
      //   `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
      // ),
    ]),
  },
});

const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: "#FFFFFF",
    accentColorForeground: "#374151",
    modalBackground: "#1C2A38",
  },
  fonts: {
    body: '"Inter", sans-serif',
  },
} as Theme);

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const { locale } = useRouter() as { locale: Locale };
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={myTheme} locale={locale}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
