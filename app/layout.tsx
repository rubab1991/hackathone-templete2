import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../app/components/footer"; 
import { ClerkProvider } from '@clerk/nextjs'
import Nav from "../app/components/nav";

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
    <ClerkProvider>
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 text-gray-800`}>
  
          <div className="flex flex-col min-h-screen">
         
            <Nav />
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        
      </body>
    </html>
    </ClerkProvider>
  );
}
