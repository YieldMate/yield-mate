import React from "react";
import SwapForm from "./SwapForm";

export default function Swap() {
  return (
    <article className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Create a new smart limit order!</h2>
        <SwapForm />
      </div>
    </article>
  );
}
