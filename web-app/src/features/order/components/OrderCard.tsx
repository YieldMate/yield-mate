import TokenPreview from "~/features/swap/components/TokenPreview";
import { type Order } from "../types/order";
import ArrowsHorizontal from "../assets/ArrowsHorizontal";
import WithdrawButton from "~/features/withdraw/components/WithdrawButton";
import { calculateExtraYield } from "../helpers/calculateExtraYield";

type OrderCardProps = {
  order: Order;
};

const STATUS_TO_STEPS_FILLED: Record<Order["status"], number> = {
  pending: 2,
  completed: 4,
  withdrawn: 5,
};

export default function OrderCard({ order }: OrderCardProps) {
  const { id, paymentToken, paymentAmount, targetToken, targetAmount, status } =
    order;

  const stepsFilled = STATUS_TO_STEPS_FILLED[status];

  const { paymentProfit, targetProfit } = calculateExtraYield(order);

  return (
    <article className="card w-[900px] flex-row bg-base-100 p-8 shadow-xl">
      <ul className="steps steps-vertical w-[200px]">
        <li className="step-primary step">Order placed</li>
        <li className={`step ${stepsFilled >= 2 ? "step-primary" : ""}`}>
          {paymentToken.symbol} redirected to a yielding protocol
        </li>
        <li className={`step ${stepsFilled >= 3 ? "step-primary" : ""}`}>
          {targetToken.symbol} purchased{" "}
        </li>
        <li className={`step ${stepsFilled >= 4 ? "step-primary" : ""}`}>
          {targetToken.symbol} redirected to a yielding protocol
        </li>
        <li className={`step ${stepsFilled >= 5 ? "step-primary" : ""}`}>
          {targetToken.symbol} withdrawn
        </li>
      </ul>
      <div className="divider divider-horizontal h-full"></div>

      <div className="flex flex-col justify-start gap-6">
        <h2 className="pl-6 text-2xl font-bold">Order ID: {id.toString()}</h2>
        <div className="flex flex-row items-start gap-4 text-gray-400">
          <div className="flex w-[260px] shrink-0 flex-col">
            <TokenPreview className="pb-0" token={paymentToken} />
            <span className="stat-value overflow-hidden text-ellipsis before:pointer-events-none before:content-['+'] before:[color:transparent]">
              {paymentAmount.toString()}
            </span>
            {paymentProfit.greaterThan(0) && (
              <span className="stat-value overflow-hidden text-ellipsis text-success">
                +{paymentProfit.toString()}
              </span>
            )}
          </div>
          <div className="flex h-full w-16 shrink-0 items-center">
            <ArrowsHorizontal />
          </div>
          <div className="flex w-[260px] shrink-0 flex-col ">
            <TokenPreview className="pb-0" token={targetToken} />
            <span className="stat-value  overflow-hidden text-ellipsis before:pointer-events-none before:content-['+'] before:[color:transparent]">
              {targetAmount.toString()}
            </span>
            {targetProfit.greaterThan(0) && (
              <span className="stat-value overflow-hidden text-ellipsis text-success">
                +{targetProfit.toString()}
              </span>
            )}
          </div>
        </div>
        <div className="mt-auto flex w-full flex-row justify-end gap-4">
          <label htmlFor="learn-more-modal" className="btn-ghost btn">
            How it works?
          </label>
          <WithdrawButton order={order} />
        </div>
      </div>
    </article>
  );
}
