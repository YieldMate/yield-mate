"use client";
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { polygon, polygonMumbai } from "wagmi/chains";

const client = createClient(
  getDefaultClient({
    appName: "Yield Mate",
    chains: [polygon, polygonMumbai],
  })
);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="midnight">{children}</ConnectKitProvider>
    </WagmiConfig>
  );
}
