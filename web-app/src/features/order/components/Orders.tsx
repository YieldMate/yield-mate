import useOrders from "../hooks/useOrders";
import OrderCard from "./OrderCard";

export default function Orders() {
  const { isLoading, orders } = useOrders();

  return (
    <div className="flex h-full flex-col items-center">
      <div className="mb-4 text-2xl font-bold">Orders</div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col gap-16 pb-16">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
