import type { Metadata } from "next";
import { Instrument_Sans, JetBrains_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

import { ApolloWrapper } from "@/lib/apollo";
import { StyledComponentsRegistry } from "@/lib/registry";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { BackofficeAuthProvider } from "@/contexts/BackofficeAuthContext";
import { THEME_STORAGE_KEY } from "@/theme/constants";

// applica il tema salvato prima dell'idratazione, per evitare il flash dark->light
const noFlashThemeScript = `
(function () {
  try {
    var stored = window.localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    document.documentElement.dataset.theme = theme;
  } catch (e) {}
})();
`;

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
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ApolloWrapper>
            <ThemeProvider>
              <BackofficeAuthProvider>{children}</BackofficeAuthProvider>
              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: "var(--card)",
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                  },
                }}
              />
            </ThemeProvider>
          </ApolloWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
