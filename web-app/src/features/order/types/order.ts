export type Order = {
  id: string;
  paymentToken: string;
  paymentAmount: string;
  paymentWithdrawable: string;
  targetToken: string;
  targetAmount: string;
  targetWithdrawable: string;
  status: "pending" | "completed" | "withdrawn";
};
