"use client";
import Image from "next/image";
import { type Token } from "../types/tokens";
import { useAtom, useAtomValue } from "jotai";
import {
  modalTypeAtom,
  paymentTokenAtom,
  targetTokenAtom,
} from "../state/modal";

export type TokenListItemProps = {
  token: Token;
};

export default function TokenListItem({ token }: TokenListItemProps) {
  const [paymentToken, setPaymentToken] = useAtom(paymentTokenAtom);
  const [targetToken, setTargetToken] = useAtom(targetTokenAtom);
  const modalType = useAtomValue(modalTypeAtom);

  const selected =
    modalType === "payment"
      ? paymentToken.symbol === token.symbol
      : targetToken.symbol === token.symbol;

  const onSelect = () => {
    if (modalType === "payment") {
      setPaymentToken(token);
    } else {
      setTargetToken(token);
    }
  };

  return (
    <label
      htmlFor="tokens-modal"
      className={`stat basis-1/2 cursor-pointer ${
        selected
          ? "rounded-md bg-base-200 hover:bg-base-300"
          : "hover:bg-base-200"
      } `}
      onClick={onSelect}
    >
      <div className="stat-title">In wallet: 1.00</div>
      <div className="stat-value">{token.symbol}</div>
      <a
        className="link-hover stat-desc link overflow-hidden text-ellipsis text-secondary"
        href={`https://polygonscan.com/token/${token.address}`}
        target="_blank"
      >
        {token.address}
      </a>
      <div className="stat-figure text-secondary">
        <div className="avatar h-16 w-16">
          <Image src={token.icon} width={64} height={64} alt={token.symbol} />
        </div>
      </div>
    </label>
  );
}
