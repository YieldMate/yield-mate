"use client";
import { type Order } from "~/features/order/types/order";
import { useOrderProfit } from "~/features/order/hooks/useOrderProfit";
import ArrowsHorizontal from "~/features/order/assets/ArrowsHorizontal";
import Image from "next/image";
import ConfirmWithdrawButton from "./ConfirmWithdrawButton";

const STATUS_TO_DESCRIPTION: Record<Order["status"], string> = {
  pending:
    "Your ordered was not fulfilled yet. You can cancel it now and withdraw your funds early along with any extra yield generated.",
  completed:
    "Your order was fulfilled. You can withdraw your newly bought tokens and any extra yield generated.",
  withdrawn: "Your funds were withdrawn.",
};

export type WithdrawDetailsProps = {
  order: Order;
};

export default function WithdrawDetails({ order }: WithdrawDetailsProps) {
  const { paymentToken, paymentAmount, targetToken, targetAmount, status } =
    order;

  const description = STATUS_TO_DESCRIPTION[status];
  const hasPaymentProfit = order.status === "pending";
  const { profit, withdrawable } = useOrderProfit(order);

  return (
    <div className="prose-h3:mb-0 prose-h3:mt-4 prose-p:mb-0">
      <p>{description}</p>
      <h3>Initial order</h3>
      <p className="flex flex-row items-center gap-4 ">
        <span className="flex flex-row items-center gap-1">
          {paymentAmount.toString()}
          <span className="font-bold">{`${paymentToken.symbol}`}</span>
          <span className="not-prose">
            <Image
              src={paymentToken.icon}
              alt={paymentToken.symbol + " icon"}
              width={16}
              height={16}
            />
          </span>
        </span>
        <span className="w-4">
          <ArrowsHorizontal />
        </span>
        <span className="flex flex-row items-center gap-1">
          {targetAmount.toString()}
          <span className="font-bold">{`${targetToken.symbol}`}</span>
          <span className="not-prose">
            <Image
              src={targetToken.icon}
              alt={targetToken.symbol + " icon"}
              width={16}
              height={16}
            />
          </span>
        </span>
      </p>
      <h3>Extra yield generated</h3>
      <p className="flex flex-row items-center gap-1 text-success">
        <span>{profit ? profit.toFixed() : "-,--"}</span>
        <span className="font-bold">
          {hasPaymentProfit ? paymentToken.symbol : targetToken.symbol}
        </span>
        <span className="not-prose">
          <Image
            src={hasPaymentProfit ? paymentToken.icon : targetToken.icon}
            alt={
              hasPaymentProfit
                ? paymentToken.symbol + " icon"
                : targetToken.symbol + " icon"
            }
            width={16}
            height={16}
          />
        </span>
      </p>
      <h3>Withdrawal summary</h3>
      <p className="flex flex-row items-center gap-1">
        <span>{withdrawable ? withdrawable.toFixed() : "-,--"}</span>
        <span className="font-bold">
          {hasPaymentProfit ? paymentToken.symbol : targetToken.symbol}
        </span>
        <span className="not-prose">
          <Image
            src={hasPaymentProfit ? paymentToken.icon : targetToken.icon}
            alt={
              hasPaymentProfit
                ? paymentToken.symbol + " icon"
                : targetToken.symbol + " icon"
            }
            width={16}
            height={16}
          />
        </span>
      </p>
      <div className="flex w-full justify-end">
        <ConfirmWithdrawButton order={order} />
      </div>
    </div>
  );
}
