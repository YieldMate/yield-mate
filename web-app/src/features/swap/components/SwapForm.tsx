"use client";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAtom } from "jotai";
import {
  modalTypeAtom,
  paymentTokenAtom,
  targetTokenAtom,
} from "../state/modal";
import { type ChangeEvent } from "react";
import Arrows from "../assets/Arrows";
import TokenPreview from "./TokenPreview";
import Decimal from "decimal.js";

type Inputs = {
  paymentAmount: string;
  targetAmount: string;
  ratio: string;
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
  const [paymentToken, setPaymentToken] = useAtom(paymentTokenAtom);
  const [targetToken, setTargetToken] = useAtom(targetTokenAtom);

  const paymentAmount = watch("paymentAmount");
  const targetAmount = watch("targetAmount");
  const ratio = watch("ratio");

  const onPaymentAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(VALID_DECIMAL_REGEX)) {
      if (targetAmount && targetAmount !== "0") {
        const newRatio = new Decimal(e.target.value).dividedBy(targetAmount);
        setValue("ratio", newRatio.toString(), {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
      return;
    }
    if (e.target.value === "") {
      setValue("ratio", "");
      return;
    }
    return setValue("paymentAmount", paymentAmount);
  };

  const onTargetAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(VALID_DECIMAL_REGEX)) {
      if (paymentAmount && e.target.value !== "0") {
        const newRatio = new Decimal(paymentAmount).dividedBy(e.target.value);
        setValue("ratio", newRatio.toString(), {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
      return;
    }
    if (e.target.value === "") {
      setValue("ratio", "");
      return;
    }
    return setValue("targetAmount", targetAmount, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onRatioChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.match(VALID_DECIMAL_REGEX)) {
      if (paymentAmount) {
        const newTargetAmount = new Decimal(paymentAmount).dividedBy(
          e.target.value
        );
        setValue("targetAmount", newTargetAmount.toString(), {
          shouldValidate: true,
          shouldDirty: true,
        });
      }
      return;
    }
    if (e.target.value === "") {
      setValue("targetAmount", "", { shouldValidate: true, shouldDirty: true });
      return;
    }
    return setValue("ratio", targetAmount, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const swapTokens = () => {
    setValue("paymentAmount", targetAmount, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("targetAmount", paymentAmount, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setPaymentToken(targetToken);
    setTargetToken(paymentToken);
    if (ratio === "") return;
    setValue("ratio", new Decimal(1).dividedBy(ratio).toString(), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-8">
        <div className="relative">
          <input
            type="text"
            inputMode="decimal"
            autoComplete="off"
            autoCorrect="off"
            placeholder="0.00"
            className="h-[112px] w-full rounded-lg bg-zinc-700 pl-4 text-2xl"
            {...register("paymentAmount", {
              required: true,
              onChange: onPaymentAmountChange,
              validate: (value) => new Decimal(value).greaterThan(0),
            })}
          />
          <label
            htmlFor="tokens-modal"
            className="absolute right-0 top-0 h-[112px] w-[240px] cursor-pointer  rounded-lg hover:bg-zinc-600"
            onClick={() => {
              setModalType("payment");
            }}
          >
            <TokenPreview token={paymentToken} />
          </label>
        </div>
        <div className="flex flex-row gap-4">
          <div
            className="h-16 w-16 cursor-pointer rounded-lg hover:bg-base-200"
            onClick={swapTokens}
          >
            <Arrows />
          </div>
          <div className="relative">
            <input
              type="text"
              className="h-16 rounded-lg bg-zinc-700 px-4 text-2xl "
              placeholder="0.00"
              inputMode="decimal"
              autoComplete="off"
              autoCorrect="off"
              {...register("ratio", {
                required: true,
                onChange: onRatioChange,
                validate: (value) => new Decimal(value).greaterThan(0),
              })}
            />
            <div className="absolute right-4 top-0 flex h-16 items-center">
              <span className="text-2xl text-secondary">
                {paymentToken.symbol}
              </span>
            </div>
          </div>
          <div className="flex h-16 items-center text-2xl text-secondary">
            <span>/ 1 {targetToken.symbol}</span>
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            inputMode="decimal"
            autoComplete="off"
            autoCorrect="off"
            placeholder="0.00"
            className="h-[112px] w-full rounded-lg bg-zinc-700 pl-4 text-2xl "
            {...register("targetAmount", {
              required: true,
              onChange: onTargetAmountChange,
              validate: (value) => new Decimal(value).greaterThan(0),
            })}
          />
          <label
            htmlFor="tokens-modal"
            className="absolute right-0 top-0 h-[112px] w-[240px] cursor-pointer rounded-lg hover:bg-zinc-600"
            onClick={() => {
              setModalType("target");
            }}
          >
            <TokenPreview token={targetToken} />
          </label>
        </div>
      </div>

      <div className="card-actions mt-8 justify-end">
        <button className="btn-primary btn" disabled={!isValid}>
          Place order
        </button>
      </div>
    </form>
  );
}
