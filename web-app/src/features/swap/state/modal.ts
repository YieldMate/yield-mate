import { atom } from "jotai";
import { type Token } from "../types/tokens";
import { SUPPORTED_TOKENS } from "../constants/tokens";

export const modalTypeAtom = atom<"payment" | "target">("payment");
export const paymentTokenAtom = atom<Token>(SUPPORTED_TOKENS[5]!); // Default: DAI
export const targetTokenAtom = atom<Token>(SUPPORTED_TOKENS[0]!); // Default: MATIC
