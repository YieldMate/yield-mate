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
        targetToken: "WETH",
        targetAmount: "1",
        status: "pending",
      },
      {
        id: "2",
        paymentToken: "STMATIC",
        paymentAmount: "100",
        targetToken: "MATIC",
        targetAmount: "100",
        status: "completed",
      },
      {
        id: "3",
        paymentToken: "USDT",
        paymentAmount: "440",
        targetToken: "CRV",
        targetAmount: "2",
        status: "withdrawn",
      },
      {
        id: "4",
        paymentToken: "WETH",
        paymentAmount: "0.0001",
        targetToken: "BIFI",
        targetAmount: "1",
        status: "pending",
      },
      {
        id: "5",
        paymentToken: "MATIC",
        paymentAmount: "100",
        targetToken: "USDC",
        targetAmount: "123",
        status: "withdrawn",
      },
    ] as Order[],
  };
}
