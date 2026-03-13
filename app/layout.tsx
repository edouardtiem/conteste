import type { Metadata, Viewport } from "next";
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
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000091",
};

function Header() {
  return (
    <header className="bg-white border-b-[3px] border-bleu-france">
      <div className="container-landing flex items-center gap-3 py-3">
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
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gris-fond border-t border-gris-bordure mt-auto">
      <div className="container-landing py-6">
        <div className="flex flex-wrap gap-4 text-[14px] text-gris-mention mb-4">
          <a href="#" className="hover:text-bleu-france">
            Mentions legales
          </a>
          <a href="#" className="hover:text-bleu-france">
            CGU
          </a>
          <a href="#" className="hover:text-bleu-france">
            Confidentialite
          </a>
          <a href="#" className="hover:text-bleu-france">
            Contact
          </a>
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
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
