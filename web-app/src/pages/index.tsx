import type { NextPage } from "next";
import { ConnectKitButton } from "connectkit";
import WalletDropdown from "~/features/wallet/components/WalletDropdown";

const Home: NextPage = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <ConnectKitButton />
      <WalletDropdown />
    </div>
  );
};

export default Home;
