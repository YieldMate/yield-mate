"use client";
import { useAtomValue } from "jotai";
import { type Order } from "../types/order";
import OrderCard from "./OrderCard";
import { ordersFilterAtom } from "../state/ordersFilter";

type OrdersListProps = {
  orders: Order[];
};

export default function OrdersList({ orders }: OrdersListProps) {
  const selectedFilter = useAtomValue(ordersFilterAtom);
  const ordersFiltered = orders.filter((order) => {
    if (selectedFilter === "all") {
      return true;
    }
    return order.status === selectedFilter;
  });

  return (
    <div className="flex flex-col gap-16 pb-16">
      {ordersFiltered.map((order) => (
        <OrderCard key={order.id.toString()} order={order} />
      ))}
    </div>
  );
}
