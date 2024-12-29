import "@/styles/globals.css";
import { Lato } from "next/font/google";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${lato.variable} font-sans`}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Component {...pageProps} />
      </ThemeProvider>
    </main>
  );
}
