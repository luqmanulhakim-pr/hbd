import type { Metadata } from "next";
import { Pacifico, Fredoka } from "next/font/google"; // Import font lucu
import "./globals.css";

// Font untuk Judul (Tulisan sambung lucu)
const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
});

// Font untuk Teks Body (Bulat-bulat cute)
const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "Happy Birthday Sayangggggg! 🎉",
  description: "Spesial untuk kamu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pacifico.variable} ${fredoka.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}