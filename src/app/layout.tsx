import type { Metadata } from "next";
import { Inter, Courgette, Cabin } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });
import { Providers } from "@/redux/provider";
import AuthWrapper from "@/components/ui/AuthWrapper";

const courgette_init = Courgette({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--courgette",
});
const cabin_init = Cabin({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--cabin",
});

export const metadata: Metadata = {
  title: "Filipina Dream Girl",
  description: "A dating website for German and Filipina people",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} ${courgette_init.variable}  ${cabin_init.variable}`}
        >
          <Providers>
            <AuthWrapper>{children} </AuthWrapper>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
