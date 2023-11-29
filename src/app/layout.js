import Footer from "@/components/footer/Footer";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import { ThemeContextProvider } from "@/context/ThemeContext";
import ThemeProvider from "@/providers/ThemeProvider";
import BackToTop from "@/components/btnTopPage/BackToTop";
import AuthProvider from "@/providers/AuthProvider";
import { Suspense } from "react";
import Loading from "./loading";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "S-BLOG - Mạng Xã Hội Chia Sẽ Quan Điểm Xã Hội Việt Nam",
  description: "Mạng Xã Hội Viết Blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vn">
      <body className={font.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                  <Navbar />
                  <Suspense fallback={<Loading />}>{children}</Suspense>
                  <BackToTop />
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
