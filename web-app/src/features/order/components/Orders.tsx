"use client";
import useOrders from "../hooks/useOrders";
import OrderFilters from "./OrderFilters";
import OrdersList from "./OrdersList";

export default function Orders() {
  const { isLoading, orders } = useOrders();

  return (
    <div className="flex h-full flex-col items-center gap-12 pt-16">
      <OrderFilters />
      {isLoading || !orders ? (
        <div>Loading...</div>
      ) : (
        <OrdersList orders={orders} />
      )}
    </div>
  );
}
