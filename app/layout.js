import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";

const Opensans = Open_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const Fugaz = Fugaz_One({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Mood Tracker",
  description: "Track your mood every day of the year",
};

export default function RootLayout({ children }) {
  // creating a variable
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href={"/"}>
        <h1 className={"text-base sm:text-lg textGradient " + Fugaz.className}>
          Mood Tracker
        </h1>
      </Link>
      <div className="flex items-center justify-between">PLACEHOLDER</div>
    </header>
  );

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={"text-indigo-400 " + Fugaz.className}>Created with ❤</p>
    </footer>
  );

  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={
            "w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 " +
            Opensans.className
          }
        >
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
