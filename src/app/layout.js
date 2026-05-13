import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Abdelrahman Maher | Portfolio",
    description: "Portfolio, projects, and admin dashboard.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link
                    rel="icon"
                    href="/portfolio.svg"
                    type="image/svg+xml"
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-bg text-text antialiased`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
