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

async function getContent() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

    const res = await fetch(`${baseUrl}/api/content`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch content');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching content:', error);
    return null;
  }
}

export default async function RootLayout({ children }) {
  const content = await getContent();

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <Header content={content} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
