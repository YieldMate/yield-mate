import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useAtomValue } from "jotai";
import { paymentTokenAtom } from "../state/modal";
import { parseUnits } from "ethers/lib/utils.js";
import { erc20ABI } from "wagmi";
import { useDebounce } from "usehooks-ts";
import { BigNumber } from "ethers";
import SwapButton from "./SwapButton";
import { OrderManager } from "~/contracts/OrderManager";
import useIsTestnet from "~/features/wallet/hooks/useIsTestnet";

export type ApproveButtonProps = {
  paymentAmount: string;
  price: string;
  disabled?: boolean;
};

export default function ApproveButton({
  paymentAmount,
  price,
  disabled,
}: ApproveButtonProps) {
  const isTestnet = useIsTestnet();

  const orderManagerAddress = isTestnet
    ? OrderManager.addressTestnet
    : OrderManager.address;

  const debouncedPaymentAmount = useDebounce(paymentAmount, 500);

  const paymentToken = useAtomValue(paymentTokenAtom);
  const paymentTokenAddress = isTestnet
    ? paymentToken.addressTestnet
    : paymentToken.address;
  const paymentAmountBigNumber = !debouncedPaymentAmount
    ? BigNumber.from(0)
    : parseUnits(debouncedPaymentAmount, paymentToken.decimals);

  const { config: allowanceConfig, isLoading: isPreparationLoading } =
    usePrepareContractWrite({
      address: paymentTokenAddress,
      abi: erc20ABI,
      functionName: "approve",
      args: [orderManagerAddress, paymentAmountBigNumber.toBigInt()],
      enabled: !disabled,
    });

  const { data: allowanceData, write: writeAllowance } =
    useContractWrite(allowanceConfig);

  const { isLoading: isAllowanceLoading, isSuccess: isTokenApproved } =
    useWaitForTransaction({
      hash: allowanceData?.hash,
    });

  // TODO: check for existing allowance
  if (isTokenApproved) {
    return <SwapButton paymentAmount={paymentAmount} price={price} />;
  }

  return (
    <button
      className="btn-primary btn"
      onClick={writeAllowance}
      disabled={disabled || isAllowanceLoading || isPreparationLoading}
    >
      {isAllowanceLoading ? "Waiting for approval..." : "Approve"}
    </button>
  );
}
