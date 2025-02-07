import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "../../src/app/components/nav";
import Footer from "../../src/app/components/footer"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hackathon E-Commerce Store",
  description: "Discover amazing products at unbeatable prices!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 text-gray-800`}>
        {/* Skip-to-Content for Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:text-blue-600 focus:bg-white focus:p-2 focus:rounded focus:shadow-lg"
        >
          Skip to content
        </a>

        {/* Wrap the entire layout in CartProvider */}
        
          <div className="flex flex-col min-h-screen">
            <Nav />
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        
      </body>
    </html>
  );
}
