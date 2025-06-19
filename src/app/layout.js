import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LWP Travel & Tours | Local Experts | Explore Bhutan Authentically",
  description: "Discover authentic Bhutan travel experiences with local experts. Custom tours, cultural immersion, trekking adventures, and luxury travel packages.",
  keywords: "Bhutan travel, Bhutan tours, Bhutan tourism, cultural tours, trekking, luxury travel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
