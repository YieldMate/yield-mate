import Providers from "~/providers";
import "~/styles/globals.css";

export const metadata = {
  title: "Yield Mate",
  description: "Limit swaps just got smarter",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
