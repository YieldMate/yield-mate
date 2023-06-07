"use client";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { polygon, polygonMumbai } from "wagmi/chains";
import { WagmiConfig, createConfig } from "wagmi";

const config = createConfig(
  getDefaultConfig({
    appName: "Yield Mate",
    chains: [polygon, polygonMumbai],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
  })
);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider theme="midnight">{children}</ConnectKitProvider>
    </WagmiConfig>
  );
}
