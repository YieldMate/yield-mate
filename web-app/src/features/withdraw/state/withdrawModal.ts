import { atom } from "jotai";
import { type Order } from "~/features/order/types/order";

export const withdrawModalOrderAtom = atom<Order | null>(null);
