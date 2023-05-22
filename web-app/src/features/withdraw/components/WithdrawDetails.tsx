"use client";
import { useAtomValue } from "jotai";
import { withdrawModalOrderAtom } from "../state/withdrawModal";
import { type Order } from "~/features/order/types/order";
import { calculateExtraYield } from "~/features/order/helpers/calculateExtraYield";
import Decimal from "decimal.js";

const STATUS_TO_DESCRIPTION: Record<Order["status"], string> = {
  pending:
    "Your ordered was not fulfilled yet. You can cancel it now and withdraw your funds early along with any extra yield generated.",
  completed:
    "Your order was fulfilled. You can withdraw your newly bought tokens and any extra yield generated.",
  withdrawn: "Your funds were withdrawn.",
};

export default function WithdrawDetails() {
  const order = useAtomValue(withdrawModalOrderAtom);
  if (!order) {
    return null;
  }
  const {
    paymentToken,
    paymentAmount,
    targetToken,
    targetAmount,
    status,
    paymentWithdrawable,
    targetWithdrawable,
  } = order;

  const { paymentProfit, targetProfit } = calculateExtraYield(order);

  const description = STATUS_TO_DESCRIPTION[status];

  return (
    <div>
      <p>{description}</p>
      <h3>Initial order</h3>
      <p className="grid grid-cols-[repeat(2,min-content)] gap-x-6">
        <span className="font-bold">{`${paymentToken}: `}</span>
        <span>{new Decimal(paymentAmount).toFixed(6)}</span>
        <span className="font-bold">{`${targetToken}:  `}</span>
        <span>{new Decimal(targetAmount).toFixed(6)}</span>
      </p>
      <h3>Extra yield generated</h3>
      <p className="grid grid-cols-[repeat(2,min-content)] gap-x-6">
        <span className="font-bold">{`${paymentToken}: `}</span>
        <span>{paymentProfit.toFixed(6)}</span>
        <span className="font-bold">{`${targetToken}:  `}</span>
        <span>{targetProfit.toFixed(6)}</span>
      </p>
      <h3>Withdrawal summary</h3>
      <p className="grid grid-cols-[repeat(2,min-content)] gap-x-6">
        <span className="font-bold">{`${paymentToken}: `}</span>
        <span>{new Decimal(paymentWithdrawable).toFixed(6)}</span>
        <span className="font-bold">{`${targetToken}:  `}</span>
        <span>{new Decimal(targetWithdrawable).toFixed(6)}</span>
      </p>
      <div className="flex w-full justify-end">
        <button className="btn-primary btn">Confirm withdrawal</button>
      </div>
    </div>
  );
}
