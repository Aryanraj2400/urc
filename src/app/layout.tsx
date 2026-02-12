import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Correct imports
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { MiniCart } from "@/components/cart/mini-cart";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spotless | Premium Room Cleaning",
  description: "Book professional room cleaning in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground transition-colors duration-300`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <Navbar />
            <MiniCart />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
