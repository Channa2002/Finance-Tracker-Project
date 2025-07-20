"use client";

// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/Components/Navigation";
import FinanceContextProvider from "@/libs/store/finance-context";
import AuthContextProvider from "@/libs/store/auth-context";
 

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthContextProvider>
          <FinanceContextProvider>
            <Nav /> 
            {children}
          </FinanceContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
