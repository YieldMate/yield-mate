import useIsTestnet from "~/features/wallet/hooks/useIsTestnet";

export type SuccessAlertProps = {
  txHash: string;
};

export default function OrderSuccessAlert({ txHash }: SuccessAlertProps) {
  const isTestnet = useIsTestnet();
  const url = isTestnet
    ? `https://mumbai.polygonscan.com/tx/${txHash}`
    : `https://polygonscan.com/tx/${txHash}`;

  return (
    <div className="alert w-fit">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-info"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>

      <span>
        Your order has been successfully placed!{" "}
        <a href={url} target="_blank" className="link-primary link">
          View on PolygonScan
        </a>
      </span>
    </div>
  );
}
