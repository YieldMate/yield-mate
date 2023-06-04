"use client";
import { useAtom } from "jotai";
import { ordersFilterAtom } from "../state/ordersFilter";

export default function OrderFilters() {
  const [selectedFilter, setSelectedFilter] = useAtom(ordersFilterAtom);

  return (
    <section className="flex flex-row gap-1 rounded-md bg-base-100 p-6 shadow-xl">
      <button
        type="button"
        onClick={() => setSelectedFilter("all")}
        className={`badge-primary badge badge-lg cursor-pointer ${
          selectedFilter !== "all" ? "badge-outline" : ""
        }`}
      >
        All
      </button>
      <button
        type="button"
        onClick={() => setSelectedFilter("pending")}
        className={`badge-primary badge badge-lg cursor-pointer ${
          selectedFilter !== "pending" ? "badge-outline" : ""
        }`}
      >
        Waiting for target price
      </button>
      <button
        type="button"
        onClick={() => setSelectedFilter("completed")}
        className={`badge-primary badge badge-lg cursor-pointer ${
          selectedFilter !== "completed" ? "badge-outline" : ""
        }`}
      >
        Ready to withdraw
      </button>
      <button
        type="button"
        onClick={() => setSelectedFilter("withdrawn")}
        className={`badge-primary badge badge-lg cursor-pointer ${
          selectedFilter !== "withdrawn" ? "badge-outline" : ""
        }`}
      >
        Withdrawn
      </button>
    </section>
  );
}
