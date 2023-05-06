"use client";
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";

const client = createClient(
  getDefaultClient({
    appName: "Yield Mate",
  })
);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider theme="soft">{children}</ConnectKitProvider>
    </WagmiConfig>
  );
}
