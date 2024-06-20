import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme/themeProvider"
import Nav from "@/components/nav/nav"
import Footer from "@/components/footer/footer"

const inter = Inter({ subsets: ["latin"] })

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/"

export const metadata: Metadata = {
  title: "WordWiz",
  description:
    "WordWiz is your ultimate tool for wordsmiths, generated by create next app",
  keywords: ["Next.js", "React", "WordWiz", "Anish", "Anish Tharu", "textutil"],
  creator: "Anish Tharu",
  openGraph: {
    images: `${baseUrl}ogimage.webp`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <div className="light:bg-black">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
