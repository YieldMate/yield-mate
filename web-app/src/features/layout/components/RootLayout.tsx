import TokenModal from "~/features/swap/components/TokenModal";
import Navbar from "./Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="flex h-screen flex-col items-center justify-start overflow-x-hidden bg-base-300">
      <Navbar />
      <TokenModal />
      {children}
    </body>
  );
}
