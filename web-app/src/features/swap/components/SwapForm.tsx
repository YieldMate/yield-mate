"use client";
import Image from "next/image";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAtom, useAtomValue } from "jotai";
import {
  modalTypeAtom,
  paymentTokenAtom,
  targetTokenAtom,
} from "../state/modal";

type Inputs = {
  paymentAmount: string;
  targetAmount: string;
};

export default function SwapForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Inputs>({
    mode: "all",
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const [, setModalType] = useAtom(modalTypeAtom);
  const paymentToken = useAtomValue(paymentTokenAtom);
  const targetToken = useAtomValue(targetTokenAtom);

  return (
    <form onSubmit={void handleSubmit(onSubmit)}>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Payment token</span>
        </label>
        <label className="input-group">
          <input
            type="text"
            placeholder="0.01"
            className="input-bordered input input-lg"
            {...register("paymentAmount", { required: true })}
          />
          <label
            htmlFor="tokens-modal"
            className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-l-md rounded-r-lg hover:bg-base-200"
            onClick={() => {
              setModalType("payment");
            }}
          >
            <Image
              src={paymentToken.icon}
              width={48}
              height={48}
              alt={paymentToken.symbol}
            />
          </label>
        </label>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Target token</span>
        </label>
        <label className="flex">
          <input
            type="text"
            placeholder="0.01"
            className="input-bordered input input-lg"
            {...register("targetAmount", { required: true })}
          />
          <label
            htmlFor="tokens-modal"
            className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-l-md rounded-r-lg hover:bg-base-200"
            onClick={() => {
              setModalType("target");
            }}
          >
            <Image
              src={targetToken.icon}
              width={48}
              height={48}
              alt={targetToken.symbol}
            />
          </label>
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
