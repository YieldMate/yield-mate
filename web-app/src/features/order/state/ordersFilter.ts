import { atom } from "jotai";

export const ordersFilterAtom = atom<
  "all" | "pending" | "completed" | "withdrawn"
>("all");
