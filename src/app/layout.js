import { Inter } from "next/font/google";
import "./globals.css";
import { getContent } from "./lib/data";
import ConditionalLayout from "./components/ConditionalLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LWP Travel & Tours | Local Experts | Explore Bhutan Authentically",
  description: "Discover authentic Bhutan travel experiences with local experts. Custom tours, cultural immersion, trekking adventures, and luxury travel packages.",
  keywords: "Bhutan travel, Bhutan tours, Bhutan tourism, cultural tours, trekking, luxury travel",
};

export default async function RootLayout({ children }) {
  const content = await getContent();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <ConditionalLayout content={content}>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
