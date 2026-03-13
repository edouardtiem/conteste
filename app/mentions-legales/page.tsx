import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions legales — Conteste.app",
  description:
    "Mentions legales du site Conteste.app, service en ligne d'aide a la contestation d'amendes.",
};

export default function MentionsLegales() {
  return (
    <div className="max-w-[700px] mx-auto px-6 py-10 text-[15px] text-gris-texte">
      <h1 className="text-[22px] font-bold text-gris-titre mb-6">
        Mentions legales
      </h1>

      <section className="mb-8">
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">
          Editeur du site
        </h2>
        <p className="mb-2">
          Le site <strong>conteste.app</strong> est edite par :
        </p>
        <ul className="list-none space-y-1">
          <li>
            <strong>Raison sociale :</strong> ETH
          </li>
          <li>
            <strong>Forme juridique :</strong> SAS (Societe par actions simplifiee)
          </li>
          <li>
            <strong>SIRET :</strong> 850 365 701 00026
          </li>
          <li>
            <strong>Siege social :</strong> 22 place de l&apos;Ancienne Boucherie, 14000 Caen
          </li>
          <li>
            <strong>Capital social :</strong> 1 000,00 &euro;
          </li>
          <li>
            <strong>Numero TVA intracommunautaire :</strong> FR25850365701
          </li>
        </ul>
      </section>

      <hr className="border-gris-bordure mb-8" />

      <section className="mb-8">
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">
          Directeur de la publication
        </h2>
        <p>Edouard Tiem</p>
      </section>

      <hr className="border-gris-bordure mb-8" />

      <section className="mb-8">
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">Contact</h2>
        <p>
          Email :{" "}
          <a
            href="mailto:contact@conteste.app"
            className="text-bleu-france hover:text-bleu-france-hover underline"
          >
            contact@conteste.app
          </a>
        </p>
      </section>

      <hr className="border-gris-bordure mb-8" />

      <section className="mb-8">
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">
          Hebergeur
        </h2>
        <ul className="list-none space-y-1">
          <li>
            <strong>Vercel Inc.</strong>
          </li>
          <li>440 N Barranca Ave #4133</li>
          <li>Covina, CA 91723, Etats-Unis</li>
          <li>
            Site :{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bleu-france hover:text-bleu-france-hover underline"
            >
              vercel.com
            </a>
          </li>
        </ul>
      </section>

      <hr className="border-gris-bordure mb-8" />

      <section className="mb-8">
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">
          Propriete intellectuelle
        </h2>
        <p className="mb-2">
          L&apos;ensemble du contenu du site conteste.app (textes, images,
          graphismes, logo, structure) est la propriete exclusive de
          l&apos;editeur, sauf mention contraire. Toute reproduction,
          representation, modification ou exploitation, totale ou partielle, est
          interdite sans autorisation ecrite prealable.
        </p>
      </section>

      <hr className="border-gris-bordure mb-8" />

      <section className="mb-8">
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">
          Limitation de responsabilite
        </h2>
        <p className="mb-2">
          Conteste.app est un outil d&apos;aide a la decision. Il ne se
          substitue pas a un conseil juridique professionnel. L&apos;editeur ne
          saurait etre tenu responsable des decisions prises par
          l&apos;utilisateur sur la base des informations fournies par le
          service.
        </p>
        <p>
          L&apos;editeur s&apos;efforce d&apos;assurer l&apos;exactitude des
          informations diffusees sur le site, mais ne garantit pas
          l&apos;absence d&apos;erreurs ou d&apos;omissions.
        </p>
      </section>

      <hr className="border-gris-bordure mb-8" />

      <section>
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">
          Droit applicable
        </h2>
        <p>
          Les presentes mentions legales sont soumises au droit francais. En cas
          de litige, les tribunaux francais seront seuls competents.
        </p>
      </section>
    </div>
  );
}
