"use client";
import Balance from "~/features/wallet/components/Balance";
import { type Token } from "../types/tokens";
import useIsTestnet from "~/features/wallet/hooks/useIsTestnet";
import Image from "next/image";

export type TokenPreviewProps = {
  token: Token;
  className?: string;
  showBalance?: boolean;
};

export default function TokenPreview({
  token,
  className,
  showBalance,
}: TokenPreviewProps) {
  const isTestnet = useIsTestnet();

  const address = isTestnet ? token.addressTestnet : token.address;
  const explorerUrl = isTestnet
    ? `https://mumbai.polygonscan.com/token/${address}`
    : `https://polygonscan.com/token/${address}`;
  return (
    <article className={`stat rounded-md ${className || ""}`}>
      {showBalance && (
        <div className="stat-title overflow-hidden">
          Balance: <Balance token={token} />
        </div>
      )}
      <div className="stat-value">{token.symbol}</div>
      <a
        className="link-hover stat-desc link overflow-hidden text-ellipsis text-secondary"
        href={explorerUrl}
        target="_blank"
      >
        {address}
      </a>
      <div className="stat-figure text-secondary">
        <div className="avatar h-16 w-16">
          <Image src={token.icon} width={64} height={64} alt={token.symbol} />
        </div>
      </div>
    </article>
  );
}
