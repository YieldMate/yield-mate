"use client";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
  paymentToken: string;
  paymentAmount: string;
  targetToken: string;
  targetAmount: string;
};

export default function SwapForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Inputs>({ mode: "all" });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={void handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Enter amount</span>
        </label>
        <label className="input-group">
          <input
            type="text"
            placeholder="0.01"
            className="input-bordered input"
            {...register("paymentAmount", { required: true })}
          />
          <div className="dropdown">
            <label tabIndex={0} className="btn">
              BTC
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <button type="button">BTC</button>
              </li>
              <li>
                <button type="button">ETH</button>
              </li>
              <li>
                <button type="button">DAI</button>
              </li>
            </ul>
          </div>
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
            {...register("targetAmount", { required: true })}
          />
          <div className="dropdown">
            <label tabIndex={0} className="btn">
              BTC
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <button type="button">BTC</button>
              </li>
              <li>
                <button type="button">ETH</button>
              </li>
              <li>
                <button type="button">DAI</button>
              </li>
            </ul>
          </div>
        </label>
      </div>

      <div className="card-actions mt-8 justify-end">
        <button className="btn-primary btn" disabled={!isValid}>
          Place order
        </button>
      </div>
    </form>
  );
}
