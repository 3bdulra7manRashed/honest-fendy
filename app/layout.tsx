import type { Metadata, Viewport } from "next";
import { Alexandria, Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { siteUrl } from "@/lib/utils";
import "./globals.css";

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-alexandria"
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-plex-arabic"
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-cairo"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "هونست فندي | مؤسسة الابتكار والمواد المتقدمة",
    template: "%s | هونست فندي"
  },
  description:
    "هونست فندي مؤسسة ابتكار ومواد متقدمة تركز على حلول المياه والبيئة والاستدامة وبراءات الاختراع والبحث والتطوير المعرفي.",
  keywords: [
    "هونست فندي",
    "المواد المتقدمة",
    "حلول المياه",
    "الهندسة البيئية",
    "الاستدامة",
    "براءات الاختراع",
    "مؤسسة الابتكار"
  ],
  openGraph: {
    title: "هونست فندي | مؤسسة الابتكار والمواد المتقدمة",
    description:
      "أكثر من ثلاثين عامًا من الابتكار في حلول المياه والبيئة والمواد المتقدمة والبحث وبراءات الاختراع.",
    url: siteUrl,
    siteName: "هونست فندي",
    locale: "ar_EG",
    type: "website",
    images: [
      {
        url: "/honest-fendy/hero.png",
        width: 1792,
        height: 1024,
        alt: "هونست فندي للمواد المتقدمة وحلول المياه"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "هونست فندي | مؤسسة الابتكار والمواد المتقدمة",
    description: "نطوّر حلولًا مستدامة من خلال البحث العلمي والاختراع والتقنيات المتقدمة.",
    images: ["/honest-fendy/hero.png"]
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0F14"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${alexandria.variable} ${ibmPlexArabic.variable} ${cairo.variable} noise font-sans antialiased`}>
        <ThemeProvider>
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
