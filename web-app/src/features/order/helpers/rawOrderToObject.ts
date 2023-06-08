import { SUPPORTED_TOKENS } from "~/features/swap/constants/tokens";
import { type RawOrder, type Order } from "../types/order";
import { formatUnits } from "viem";
import Decimal from "decimal.js";

export const rawOrderToObject = (
  orderId: bigint,
  { assetIn, assetOut, amountIn, targetPrice, status }: RawOrder,
  { isTestnet }: { isTestnet: boolean }
): Order => {
  const assetInToken = SUPPORTED_TOKENS.find((token) =>
    isTestnet ? token.addressTestnet === assetIn : token.address === assetIn
  );
  if (!assetInToken) {
    throw new Error(`AssetIn ${assetIn} not supported`);
  }

  const assetOutToken = SUPPORTED_TOKENS.find((token) =>
    isTestnet ? token.addressTestnet === assetOut : token.address === assetOut
  );
  if (!assetOutToken) {
    throw new Error(`AssetOut ${assetOut} not supported`);
  }
  const paymentAmount = new Decimal(
    formatUnits(amountIn, assetInToken.decimals)
  );
  const targetAmount = new Decimal(
    formatUnits(targetPrice, assetOutToken.decimals)
  ).mul(paymentAmount);

  // TODO: calculate withdrawable
  const paymentWithdrawable = new Decimal(0);
  const targetWithdrawable = new Decimal(0);

  return {
    id: orderId,
    paymentToken: assetInToken,
    paymentAmount,
    paymentWithdrawable,
    targetToken: assetOutToken,
    targetAmount,
    targetWithdrawable,
    status: status.executed
      ? "withdrawn"
      : status.amountOut > 0
      ? "completed"
      : "pending",
  };
};
