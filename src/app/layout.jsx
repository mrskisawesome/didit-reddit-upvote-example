import { Inter } from "next/font/google";
import { UserInfo } from "./components/UserInfo";

import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Didit",
  description: "A social app like Reddit or Hacker News",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b border-zinc-800 p-4 flex items-center">
          <Link href="/" className="text-xl">
            Didit
          </Link>
          <Link
            href="/add-post"
            className="ml-10 hover:bg-zinc-300 p-2 rounded-xl bg-pink-300 text-black"
          >
            Add post
          </Link>
          <div className="ml-auto">
            <UserInfo />
          </div>
        </header>
        <main className="max-w-screen-xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
