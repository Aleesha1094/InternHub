import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import { AOSInit } from "@/components/aos";
import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Future Interns",
  description: "Internship Providing Platform",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <AOSInit />
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div>
            <Navbar/>
            {children}
          </div>
        </SessionProvider>
        <Footer/>
      </body>
    </html>
  );
}