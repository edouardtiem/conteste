import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conteste.app — Contestez vos amendes en ligne",
  description:
    "Analysez gratuitement vos chances de contester une amende. Score instantane, arguments personnalises et guide ANTAI etape par etape.",
  keywords: [
    "contester amende",
    "contestation amende",
    "contester PV",
    "ANTAI",
    "amende radar",
    "contester stationnement",
  ],
  authors: [{ name: "Conteste.app" }],
  manifest: "/manifest.json",
  openGraph: {
    title: "Conteste.app — Contestez vos amendes en ligne",
    description:
      "Analysez gratuitement vos chances de contester une amende. Score instantane et guide personnalise.",
    url: "https://conteste.app",
    siteName: "Conteste.app",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conteste.app — Contestez vos amendes en ligne",
    description:
      "Analysez gratuitement vos chances de contester une amende. Score instantane et guide personnalise.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000091",
};

function Header() {
  return (
    <header className="bg-white border-b-[3px] border-bleu-france">
      <div className="container-landing flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-[44px] h-[44px] bg-bleu-france rounded-sm flex items-center justify-center text-white font-bold text-sm">
            RF
          </div>
          <div>
            <div className="text-[20px] font-bold text-bleu-france">
              conteste.app
            </div>
            <div className="text-[12px] text-gris-mention">
              Contestez vos amendes en ligne
            </div>
          </div>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/guides"
            className="hidden min-[500px]:inline-flex items-center min-h-[44px] text-[14px] text-gris-texte hover:text-bleu-france transition-colors"
          >
            Guides
          </Link>
          <Link
            href="/stats"
            className="hidden min-[500px]:inline-flex items-center min-h-[44px] text-[14px] text-gris-texte hover:text-bleu-france transition-colors"
          >
            Statistiques
          </Link>
          <Link
            href="/a-propos"
            className="hidden min-[500px]:inline-flex items-center min-h-[44px] text-[14px] text-gris-texte hover:text-bleu-france transition-colors"
          >
            &Agrave; propos
          </Link>
          <Link
            href="/contest/upload"
            className="inline-flex items-center min-h-[44px] bg-bleu-france hover:bg-bleu-france-hover text-white text-[13px] font-bold px-[16px] py-[8px] rounded-button transition-colors"
          >
            Analyser mon amende
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gris-fond border-t border-gris-bordure mt-auto">
      <div className="container-landing py-6">
        <div className="flex flex-wrap gap-4 text-[14px] text-gris-mention mb-4">
          <Link href="/mentions-legales" className="hover:text-bleu-france">
            Mentions legales
          </Link>
          <Link href="/cgu" className="hover:text-bleu-france">
            CGU
          </Link>
          <Link href="/confidentialite" className="hover:text-bleu-france">
            Confidentialite
          </Link>
          <Link href="/contact" className="hover:text-bleu-france">
            Contact
          </Link>
        </div>
        <p className="text-[12px] text-gris-mention">
          Conteste.app est un outil d&apos;aide a la decision. Ce n&apos;est
          pas un cabinet d&apos;avocats. Aucune garantie de resultat n&apos;est
          fournie.
        </p>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-799H6MS6RD"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-799H6MS6RD');
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
