import StyledComponentsRegistry from "@/lib/StyledComponentsRegistry";
import StoreProvider from "../lib/StoreProvider";
import "./global.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <StoreProvider>
            <div className="main">{children}</div>
          </StoreProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
