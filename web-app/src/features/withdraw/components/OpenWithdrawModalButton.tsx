"use client";
import { type Order } from "~/features/order/types/order";
import { withdrawModalOrderAtom } from "../state/withdrawModal";
import { useAtom } from "jotai";

type OpenWithdrawModalButtonProps = {
  order: Order;
};

export default function OpenWithdrawModalButton({
  order,
}: OpenWithdrawModalButtonProps) {
  const { status, paymentToken, targetToken } = order;
  const [, setWithdrawModalOrder] = useAtom(withdrawModalOrderAtom);
  const handleWithdraw = () => {
    setWithdrawModalOrder(order);
  };

  if (status === "withdrawn") {
    return (
      <button className="btn-primary btn" disabled>
        Withdrawn
      </button>
    );
  }
  return (
    <label
      className="btn-primary btn"
      htmlFor="withdraw-modal"
      role="button"
      onClick={handleWithdraw}
    >{`Withdraw ${
      status === "pending" ? paymentToken.symbol : targetToken.symbol
    }`}</label>
  );
}
