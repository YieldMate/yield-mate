import { useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { OrderManager } from "~/contracts/OrderManager";
import { type Order } from "~/features/order/types/order";
import OrderSuccessAlert from "~/features/swap/components/OderSuccessAlert";
import useIsTestnet from "~/features/wallet/hooks/useIsTestnet";

export type ConfirmWithdrawButtonProps = {
  order: Order;
};

export default function ConfirmWithdrawButton({
  order,
}: ConfirmWithdrawButtonProps) {
  const isTestnet = useIsTestnet();
  const isOrderPending = order.status === "pending";

  const functionToCall = isOrderPending ? "cancelOrder" : "withdraw";
  const contractAddress = isTestnet
    ? OrderManager.addressTestnet
    : OrderManager.address;

  const { config, isLoading: isConfigLoading } = usePrepareContractWrite({
    address: contractAddress,
    abi: OrderManager.abi,
    functionName: functionToCall,
    args: [order.id],
  });

  const { data: withdrawalData, write: writeWithdraw } =
    useContractWrite(config);

  const {
    isLoading: isWithdrawLoading,
    isSuccess: isWithdrawSuccess,
    data: withdrawSuccessData,
  } = useWaitForTransaction({
    hash: withdrawalData?.hash,
  });

  useEffect(() => {
    if (isWithdrawSuccess && withdrawSuccessData) {
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } pointer-events-auto flex w-full items-center justify-center rounded-lg `}
        >
          <OrderSuccessAlert txHash={withdrawSuccessData?.transactionHash} />
        </div>
      ));
    }
  }, [isWithdrawSuccess, withdrawSuccessData]);

  return (
    <button
      className="btn-primary btn"
      onClick={writeWithdraw}
      disabled={isConfigLoading || isWithdrawLoading || isWithdrawSuccess}
    >
      {isWithdrawLoading
        ? "Waiting for confirmation..."
        : isWithdrawSuccess
        ? "Success!"
        : "Confirm Withdraw"}
    </button>
  );
}
