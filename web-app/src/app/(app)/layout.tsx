import Providers from "~/Providers";
import LearnMoreModal from "~/features/layout/components/LearnMoreModal";
import Navbar from "~/features/layout/components/Navbar";
import TokenModal from "~/features/swap/components/TokenModal";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <body className="flex h-screen flex-col items-center justify-start overflow-x-hidden bg-base-300 [background-image:url('/micro_carbon.png')]">
        <Navbar />
        <TokenModal />
        <LearnMoreModal />
        {children}
      </body>
    </Providers>
  );
}
