import { type Order } from "../types/order";
import Decimal from "decimal.js";

export const calculateExtraYield = ({
  paymentWithdrawable,
  paymentAmount,
  targetWithdrawable,
  targetAmount,
  status,
}: Order) => {
  const paymentAmountDecimal = new Decimal(paymentAmount);
  const paymentWithdrawableDecimal = new Decimal(paymentWithdrawable);
  const targetAmountDecimal = new Decimal(targetAmount);
  const targetWithdrawableDecimal = new Decimal(targetWithdrawable);

  const paymentProfit =
    status === "pending"
      ? paymentWithdrawableDecimal.minus(paymentAmountDecimal)
      : paymentWithdrawableDecimal;

  const targetProfit =
    status === "pending"
      ? 0
      : targetWithdrawableDecimal.minus(targetAmountDecimal);

  return {
    paymentProfit,
    targetProfit,
  };
};
