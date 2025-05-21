import Header from "@/components/Header";
import { getDocument } from "@/lib/doc";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Next js | DocStream",
  description: "A Documentation Stream for Next.js",
};

export default function RootLayout({ children }) {
  const allDocuments = getDocument();
  // const allDocContents= getContentById(1)
   // console.log(allDocuments);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="h-full lg:ml-72 xl:ml-80">
          {/* <Header docs={allDocuments}/> */}
          <Header />
          {/* <SideBar /> */}
          <div className="relative px-4 pt-14 sm:px-6 lg:px-8">
            <main className="flex-auto py-16">{children}</main>
          </div>
        </div>
        {/* <div>
         <Header/>
        {children}
       </div> */}
      </body>
    </html>
  );
}
