import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useAtomValue } from "jotai";
import { paymentTokenAtom, targetTokenAtom } from "../state/modal";
import { parseUnits } from "ethers/lib/utils.js";
import { useDebounce } from "usehooks-ts";
import { BigNumber } from "ethers";
import { OrderManager } from "~/contracts/OrderManager";
import useIsTestnet from "~/features/wallet/hooks/useIsTestnet";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import OrderSuccessAlert from "./OderSuccessAlert";

export type SwapButtonProps = {
  paymentAmount: string;
  price: string;
  disabled?: boolean;
};

export default function SwapButton({
  paymentAmount,
  price,
  disabled,
}: SwapButtonProps) {
  const isTestnet = useIsTestnet();

  const orderManagerAddress = isTestnet
    ? OrderManager.addressTestnet
    : OrderManager.address;

  const debouncedPaymentAmount = useDebounce(paymentAmount, 500);
  const debouncedPrice = useDebounce(price, 500);

  const paymentToken = useAtomValue(paymentTokenAtom);
  const targetToken = useAtomValue(targetTokenAtom);

  const paymentTokenAddress = isTestnet
    ? paymentToken.addressTestnet
    : paymentToken.address;
  const targetTokenAddress = isTestnet
    ? targetToken.addressTestnet
    : targetToken.address;

  const paymentAmountBigNumber = !debouncedPaymentAmount
    ? BigNumber.from(0)
    : parseUnits(debouncedPaymentAmount, paymentToken.decimals);
  const priceBigNumber = !debouncedPrice
    ? BigNumber.from(0)
    : parseUnits(debouncedPrice, paymentToken.decimals);

  const { config: orderConfig } = usePrepareContractWrite({
    address: orderManagerAddress,
    abi: OrderManager.abi,
    functionName: "addOrder",
    args: [
      paymentTokenAddress,
      targetTokenAddress,
      paymentAmountBigNumber.toBigInt(),
      priceBigNumber.toBigInt(),
      0,
    ],
    enabled: !disabled,
  });

  const { data: orderData, write: writeOrder } = useContractWrite(orderConfig);

  const { isLoading: isOrderLoading, isSuccess: isOrderSuccess } =
    useWaitForTransaction({
      hash: orderData?.hash,
    });

  useEffect(() => {
    if (isOrderSuccess) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } pointer-events-auto flex w-full items-center justify-center rounded-lg `}
        >
          <OrderSuccessAlert txHash="0x1234567890" />
        </div>
      ));
    }
  }, [isOrderSuccess]);

  return (
    <button
      className="btn-primary btn"
      onClick={writeOrder}
      disabled={disabled || isOrderLoading || isOrderSuccess}
    >
      {isOrderLoading
        ? "Waiting for confirmation..."
        : isOrderSuccess
        ? "Order created!"
        : "Create order"}
    </button>
  );
}
