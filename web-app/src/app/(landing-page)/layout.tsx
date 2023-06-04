export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body className="h-screen w-screen [background-image:url('/micro_carbon.png')]">
      {children}
    </body>
  );
}
