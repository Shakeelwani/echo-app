import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Echo — talk to your future self",
  description: "Write something today. Open it when tomorrow becomes today.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
