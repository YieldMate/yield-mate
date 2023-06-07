import type Decimal from "decimal.js";
import { type Token } from "~/features/swap/types/tokens";

export type Order = {
  id: bigint;
  paymentToken: Token;
  paymentAmount: Decimal;
  paymentWithdrawable: Decimal;
  targetToken: Token;
  targetAmount: Decimal;
  targetWithdrawable: Decimal;
  status: "pending" | "completed" | "withdrawn";
};

export type RawOrder = {
  assetIn: `0x${string}`;
  assetOut: `0x${string}`;
  amountIn: bigint;
  targetPrice: bigint;
  status: {
    executed: boolean;
    amountOut: bigint;
  };
  orderType: number;
};
