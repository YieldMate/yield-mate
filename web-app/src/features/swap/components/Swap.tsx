import React from "react";
import SwapForm from "./SwapForm";

export default function Swap() {
  return (
    <article className="card w-[560px] bg-base-100 shadow-xl">
      <div className="card-body items-center">
        <div className="prose mb-4">
          <h2 className="mt-0">
            Create a new{" "}
            <label className="cursor-help underline" htmlFor="learn-more-modal">
              smart
            </label>{" "}
            limit order!
          </h2>
        </div>
        <SwapForm />
      </div>
    </article>
  );
}
