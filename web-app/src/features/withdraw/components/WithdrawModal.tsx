"use client";
import { useAtomValue } from "jotai";
import WithdrawDetails from "./WithdrawDetails";
import { withdrawModalOrderAtom } from "../state/withdrawModal";

export default function WithdrawModal() {
  const order = useAtomValue(withdrawModalOrderAtom);
  return (
    <>
      <input type="checkbox" id="withdraw-modal" className="modal-toggle" />
      <div className="modal">
        <div className="prose-lg modal-box">
          <h2>Withdraw</h2>
          {order ? <WithdrawDetails order={order} /> : <p>Loading ...</p>}
          <label
            className="btn absolute right-4 top-4"
            htmlFor="withdraw-modal"
          >
            &#88;
          </label>
        </div>
      </div>
    </>
  );
}
