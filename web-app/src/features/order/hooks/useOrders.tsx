import { type Order } from "../types/order";

export default function useOrders() {
  // TODO: implement when smart contract is ready

  return {
    isLoading: false,
    orders: [
      {
        id: "1",
        paymentToken: "DAI",
        paymentAmount: "2199",
        paymentWithdrawable: "2200.0245",
        targetToken: "WETH",
        targetAmount: "1",
        targetWithdrawable: "0",
        status: "pending",
      },
      {
        id: "2",
        paymentToken: "STMATIC",
        paymentAmount: "100",
        paymentWithdrawable: "1.676",
        targetToken: "MATIC",
        targetAmount: "100",
        targetWithdrawable: "100.000123",
        status: "completed",
      },
      {
        id: "3",
        paymentToken: "USDT",
        paymentAmount: "440",
        paymentWithdrawable: "0",
        targetToken: "CRV",
        targetAmount: "2",
        targetWithdrawable: "0",
        status: "withdrawn",
      },
      {
        id: "4",
        paymentToken: "WETH",
        paymentAmount: "0.0001",
        paymentWithdrawable: "0.000107",
        targetToken: "BIFI",
        targetAmount: "1",
        targetWithdrawable: "0",
        status: "pending",
      },
      {
        id: "5",
        paymentToken: "MATIC",
        paymentAmount: "100",
        paymentWithdrawable: "0",
        targetToken: "USDC",
        targetAmount: "123",
        targetWithdrawable: "0",
        status: "withdrawn",
      },
    ] satisfies Order[],
  };
}
