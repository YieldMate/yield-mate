import React from "react";

export default function Swap() {
  return (
    <article className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Create a new smart limit order!</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Enter amount</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              placeholder="0.01"
              className="input-bordered input"
            />
            <span>DAI</span>
          </label>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Enter amount</span>
          </label>
          <label className="input-group">
            <input
              type="text"
              placeholder="0.01"
              className="input-bordered input"
            />
            <span>BTC</span>
          </label>
        </div>

        <div className="card-actions mt-8">
          <button className="btn-primary btn">Place order</button>
        </div>
      </div>
    </article>
  );
}
