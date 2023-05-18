import Orders from "~/features/order/components/Orders";

export default function OrdersPage() {
  return (
    <main className="h-full w-full overflow-hidden">
      <div className="flex h-full w-full items-center justify-center  overflow-y-auto overflow-x-hidden">
        <Orders />
      </div>
    </main>
  );
}
