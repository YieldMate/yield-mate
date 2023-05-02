import { type AppType } from "next/dist/shared/lib/utils";

import "~/styles/globals.css";
import { WagmiConfig, createClient } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";

const client = createClient(
  getDefaultClient({
    appName: "Yield Mate",
  })
);

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>
        <Component {...pageProps} />;
      </ConnectKitProvider>
    </WagmiConfig>
  );
};

export default MyApp;
