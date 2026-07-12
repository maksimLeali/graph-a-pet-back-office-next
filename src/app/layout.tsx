import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

import { ApolloWrapper } from "@/lib/apollo";
import { StyledComponentsRegistry } from "@/lib/registry";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Graph-a-Pet — Back Office",
  description: "Pannello di amministrazione Graph-a-Pet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${instrumentSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <StyledComponentsRegistry>
          <ApolloWrapper>
            {children}
            <Toaster position="top-right" />
          </ApolloWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
