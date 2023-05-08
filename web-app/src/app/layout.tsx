import "@fontsource/source-sans-pro";
import "@fontsource/oswald";

import "~/styles/globals.css";
import RootLayout from "~/features/layout/components/RootLayout";
import Providers from "~/Providers";

export const metadata = {
  title: "Yield Mate",
  description: "Limit swaps just got smarter",
};

export default function Layout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="business">
      <Providers>
        <RootLayout>{children}</RootLayout>
      </Providers>
    </html>
  );
}
