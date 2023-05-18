"use client";
import { type Token } from "../types/tokens";
import { useAtom, useAtomValue } from "jotai";
import {
  modalTypeAtom,
  paymentTokenAtom,
  targetTokenAtom,
} from "../state/modal";
import TokenPreview from "./TokenPreview";

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
      onClick={onSelect}
      className="basis-1/2 cursor-pointer "
    >
      <TokenPreview
        showBalance
        token={token}
        className={
          selected ? "bg-base-200 hover:bg-base-300" : "hover:bg-base-200"
        }
      />
    </label>
  );
}
