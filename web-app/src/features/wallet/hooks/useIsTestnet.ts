import { useChainId } from "wagmi";
import { polygon } from "wagmi/chains";

export default function useIsTestnet(): boolean {
  const chainId = useChainId();
  return chainId !== polygon.id;
}
