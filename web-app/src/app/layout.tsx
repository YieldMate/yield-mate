import "@fontsource/quattrocento";
import "@fontsource/questrial";

import "~/styles/globals.css";

export const metadata = {
  title: "Yield Mate",
  description: "Limit swaps just got smarter",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="business">
      {children}
    </html>
  );
}
