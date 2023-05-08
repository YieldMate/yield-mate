import React from "react";
import SwapForm from "./SwapForm";

export default function Swap() {
  return (
    <article className="card prose w-[400px] bg-base-100 shadow-xl">
      <div className="card-body items-center">
        <h2 className="mt-0">Create a new smart limit order!</h2>
        <SwapForm />
      </div>
    </article>
  );
}
