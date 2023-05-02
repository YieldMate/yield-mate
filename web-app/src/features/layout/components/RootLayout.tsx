import Navbar from "./Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="flex flex-col items-center justify-start">
      <Navbar />
      {children}
    </body>
  );
}
