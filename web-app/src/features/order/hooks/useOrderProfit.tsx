import { useContractRead } from "wagmi";
import { type Order } from "../types/order";
import { Vault } from "~/contracts/Vault";
import useIsTestnet from "~/features/wallet/hooks/useIsTestnet";
import { formatUnits } from "viem";
import Decimal from "decimal.js";

export const useOrderProfit = (order: Order) => {
  const isTestnet = useIsTestnet();
  const vaultAddress = isTestnet ? Vault.addressTestnet : Vault.address;

  const direction = order.status === "pending" ? "payment" : "target";

  const tokenAddress =
    direction === "payment"
      ? isTestnet
        ? order.paymentToken.addressTestnet
        : order.paymentToken.address
      : isTestnet
      ? order.targetToken.addressTestnet
      : order.targetToken.address;

  const { data, isLoading, isRefetching } = useContractRead({
    address: vaultAddress,
    abi: Vault.abi,
    functionName: "getTokenAmount",
    args: [tokenAddress, order.id],
    enabled: order.status !== "withdrawn",
  });

  const withdrawable =
    data &&
    new Decimal(
      formatUnits(
        data,
        direction === "payment"
          ? order.paymentToken.decimals
          : order.targetToken.decimals
      )
    );

  return {
    isLoading,
    isRefetching,
    withdrawable,
    profit:
      withdrawable &&
      withdrawable.minus(
        direction === "payment" ? order.paymentAmount : order.targetAmount
      ),
  };
};
