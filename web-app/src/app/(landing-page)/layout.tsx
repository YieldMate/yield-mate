export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <body className="h-screen w-screen">{children}</body>;
}
