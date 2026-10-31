import "./globals.css";
import { Bricolage_Grotesque, Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const hind = Hind_Siliguri({ subsets: ["latin", "bengali"], weight: ["400", "500", "600"], variable: "--font-hind" });

export const metadata = { title: "Shohay – Community service events", description: "Find, host and join service drives in your neighbourhood." };

const themeScript = `try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t)}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bricolage.variable} ${hind.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className="min-h-screen flex flex-col bg-base-100 text-base-content">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
      </body>
    </html>
  );
}
