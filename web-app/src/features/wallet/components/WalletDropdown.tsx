"use client";
import { useIsMounted } from "connectkit";
import { useAccount } from "wagmi";

const WalletDropdown = () => {
  const isMounted = useIsMounted();

  const { address, isConnecting, isDisconnected } = useAccount();
  if (!isMounted) return null;
  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  return <div>Connected Wallet: {address}</div>;
};

export default WalletDropdown;
