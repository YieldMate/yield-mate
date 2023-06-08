"use client";
import { useAccount, useContractRead } from "wagmi";
import { type RawOrder, type Order } from "../types/order";
import { OrderManager } from "~/contracts/OrderManager";
import { rawOrderToObject } from "../helpers/rawOrderToObject";
import useIsTestnet from "~/features/wallet/hooks/useIsTestnet";

const transformData = (
  data: readonly [readonly bigint[], readonly RawOrder[]],
  isTestnet: boolean
): Order[] => {
  const [ids, orders] = data;
  return ids
    .map((id, index) => {
      return rawOrderToObject(id, orders[index]!, { isTestnet });
    })
    .reverse();
};

export default function useOrders() {
  const { address } = useAccount();
  const isTestnet = useIsTestnet();

  const { data, isLoading } = useContractRead({
    address: OrderManager.address,
    abi: OrderManager.abi,
    functionName: "getOrdersInfo",
    args: [address || "0x0"],
    enabled: !!address,
  });
  return {
    isLoading,
    orders: data && transformData(data, isTestnet),
  };
}
