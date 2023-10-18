import Footer from "@/components/footer/Footer";
import "./globals.css";
import { Open_Sans } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Blog App",
  description: "The best blog app!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div className="container">
          <div className="wrapper">
            <Navbar />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
