export type Order = {
  id: string;
  paymentToken: string;
  paymentAmount: string;
  targetToken: string;
  targetAmount: string;
  status: "pending" | "completed" | "withdrawn";
};
