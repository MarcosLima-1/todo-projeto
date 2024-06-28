import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Life Manager",
  description: "Organize sua vida financeira",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Header />
        <main className="mt-[112px]">{children}</main>
        <Toaster className="z-50" />
        <Footer />
      </body>
    </html>
  );
}
