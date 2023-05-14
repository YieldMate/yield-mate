import { useChainId } from "wagmi";
import { polygonMumbai } from "wagmi/chains";

export default function useIsTestnet(): boolean {
  const chainId = useChainId();
  return chainId === polygonMumbai.id;
}
