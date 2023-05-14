"use client";
import Image from "next/image";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAtom, useAtomValue } from "jotai";
import {
  modalTypeAtom,
  paymentTokenAtom,
  targetTokenAtom,
} from "../state/modal";
import Balance from "~/features/wallet/components/Balance";
import { type ChangeEvent } from "react";

type Inputs = {
  paymentAmount: string;
  targetAmount: string;
};
const VALID_DECIMAL_REGEX = /^(?:0|[1-9]\d{0,17})(?:\.\d{0,24})?$/;

export default function SwapForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<Inputs>({
    mode: "all",
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const [, setModalType] = useAtom(modalTypeAtom);
  const paymentToken = useAtomValue(paymentTokenAtom);
  const targetToken = useAtomValue(targetTokenAtom);

  const paymentAmount = watch("paymentAmount");
  const targetAmount = watch("targetAmount");

  const onPaymentAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(VALID_DECIMAL_REGEX) || e.target.value === "") {
      return;
    }
    return setValue("paymentAmount", paymentAmount);
  };

  const onTargetAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(VALID_DECIMAL_REGEX) || e.target.value === "") {
      return;
    }
    return setValue("targetAmount", targetAmount);
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label htmlFor="payment-mount-input" className="label">
          <span className="label-text">Payment token</span>
        </label>
        <label className="input-group">
          <input
            id="payment-mount-input"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            autoCorrect="off"
            placeholder="0.00"
            className="input-bordered input input-lg"
            {...register("paymentAmount", {
              required: true,
              onChange: onPaymentAmountChange,
            })}
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
        <label className="label">
          <span className="label-text-alt text-secondary">
            Balance: <Balance token={paymentToken} />
          </span>
        </label>
      </div>
      <div className="form-control">
        <label htmlFor="target-mount-input" className="label">
          <span className="label-text">Target token</span>
        </label>
        <label className="flex">
          <input
            id="target-mount-input"
            type="text"
            inputMode="decimal"
            autoComplete="off"
            autoCorrect="off"
            placeholder="0.00"
            className="input-bordered input input-lg"
            {...register("targetAmount", {
              required: true,
              onChange: onTargetAmountChange,
            })}
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
        <label className="label">
          <span className="label-text-alt text-secondary">
            Balance: <Balance token={targetToken} />
          </span>
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
