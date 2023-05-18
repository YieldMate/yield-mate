"use client";
import { useAccount, useBalance } from "wagmi";
import { type Token } from "~/features/swap/types/tokens";
import useIsTestnet from "../hooks/useIsTestnet";
import { useIsMounted } from "connectkit";

export default function Balance({
  token,
  className,
}: {
  token: Token;
  className?: string;
}) {
  const isMounted = useIsMounted();
  const { address } = useAccount();
  const isTestnet = useIsTestnet();
  const { data } = useBalance({
    address,
    token: isTestnet ? token.addressTestnet : token.address,
  });
  const balance = isMounted && data ? data.formatted : "-.--";

  return <span className={className}>{balance}</span>;
}
