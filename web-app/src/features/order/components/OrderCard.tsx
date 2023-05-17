import TokenPreview from "~/features/swap/components/TokenPreview";
import { type Order } from "../types/order";
import { SUPPORTED_TOKENS } from "~/features/swap/constants/tokens";
import ArrowsHorizontal from "../assets/ArrowsHorizontal";

type OrderCardProps = {
  order: Order;
};

export default function OrderCard({ order }: OrderCardProps) {
  const { id, paymentToken, paymentAmount, targetToken, targetAmount, status } =
    order;

  const paymentTokenConfig = SUPPORTED_TOKENS.find(
    (token) => token.symbol === paymentToken
  )!;
  const targetTokenConfig = SUPPORTED_TOKENS.find(
    (token) => token.symbol === targetToken
  )!;

  return (
    <article className="card w-[900px] flex-row bg-base-100 p-8 shadow-xl">
      <ul className="steps steps-vertical w-[200px]">
        <li className="step-primary step">Order placed</li>
        <li className="step-primary step">
          {paymentToken} redirected to a yielding protocol
        </li>
        <li className="step">{targetToken} purchased </li>
        <li className="step">
          {targetToken} redirected to a yielding protocol
        </li>
        <li className="step">{targetToken} withdrawn</li>
      </ul>
      <div className="divider divider-horizontal h-full"></div>

      <div className="flex flex-col justify-between">
        <h2 className="pb-4 pl-6 text-2xl font-bold">Order ID: {id}</h2>
        <div className="flex h-[112px] flex-row items-center gap-4 text-gray-400">
          <div className="flex w-[260px] shrink-0 flex-col">
            <TokenPreview className="pb-0" token={paymentTokenConfig} />
            <span className="stat-value overflow-hidden text-ellipsis pl-6">
              {paymentAmount}
            </span>
          </div>
          <div className="h-16 w-16 shrink-0">
            <ArrowsHorizontal />
          </div>
          <div className="flex w-[260px] shrink-0 flex-col ">
            <TokenPreview className="pb-0" token={targetTokenConfig} />
            <span className="stat-value  overflow-hidden text-ellipsis pl-6">
              {targetAmount}
            </span>
          </div>
        </div>
        <div className="flex w-full flex-row justify-end gap-4">
          <label htmlFor="learn-more-modal" className="btn-ghost btn">
            How it works?
          </label>
          <button className="btn-primary btn">Withdraw</button>
        </div>
      </div>
    </article>
  );
}
