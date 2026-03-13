import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialite — Conteste.app",
  description:
    "Politique de confidentialite et protection des donnees personnelles de Conteste.app, conforme au RGPD.",
};

export default function Confidentialite() {
  return (
    <div className="max-w-[700px] mx-auto px-6 py-10 text-[15px] text-gris-texte">
      <h1 className="text-[22px] font-bold text-gris-titre mb-2">
        Politique de confidentialite
      </h1>
      <p className="text-[13px] text-gris-mention mb-8">
        Derniere mise a jour : mars 2026
      </p>

      <section className="mb-8">
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">
          1. Responsable du traitement
        </h2>
        <p className="mb-2">
          Le responsable du traitement des donnees personnelles collectees sur
          conteste.app est l&apos;editeur du site (voir{" "}
          <a
            href="/mentions-legales"
            className="text-bleu-france hover:text-bleu-france-hover underline"
          >
            mentions legales
          </a>
          ).
        </p>
        <p>
          Contact DPO :{" "}
          <a
            href="mailto:dpo@conteste.app"
            className="text-bleu-france hover:text-bleu-france-hover underline"
          >
            dpo@conteste.app
          </a>
        </p>
      </section>

      <hr className="border-gris-bordure mb-8" />

      <section className="mb-8">
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">
          2. Donnees collectees
        </h2>
        <p className="mb-3">
          Dans le cadre de l&apos;utilisation du service, nous collectons les
          donnees suivantes :
        </p>
        <table className="w-full border-collapse mb-3 text-[14px]">
          <thead>
            <tr className="border-b-2 border-gris-bordure">
              <th className="text-left py-2 pr-4 font-bold text-gris-titre">
                Donnee
              </th>
              <th className="text-left py-2 pr-4 font-bold text-gris-titre">
                Finalite
              </th>
              <th className="text-left py-2 font-bold text-gris-titre">
                Base legale
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gris-bordure">
              <td className="py-2 pr-4">Photo de l&apos;avis de contravention</td>
              <td className="py-2 pr-4">
                Analyse et generation du dossier de contestation
              </td>
              <td className="py-2">Execution du contrat</td>
            </tr>
            <tr className="border-b border-gris-bordure">
              <td className="py-2 pr-4">Adresse email</td>
              <td className="py-2 pr-4">
                Envoi du dossier et communication
              </td>
              <td className="py-2">Execution du contrat</td>
            </tr>
            <tr className="border-b border-gris-bordure">
              <td className="py-2 pr-4">Donnees de paiement</td>
              <td className="py-2 pr-4">Traitement du paiement</td>
              <td className="py-2">Execution du contrat</td>
            </tr>
          </tbody>
        </table>
        <p className="text-[13px] text-gris-mention">
          Les donnees de paiement (numero de carte) ne sont jamais stockees sur
          nos serveurs. Elles sont traitees directement par Stripe.
        </p>
      </section>

      <hr className="border-gris-bordure mb-8" />

      <section className="mb-8">
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">
          3. Duree de conservation
        </h2>
        <p>
          Les donnees personnelles (photo de l&apos;amende, dossier genere) sont
          conservees pour une duree maximale de{" "}
          <strong>30 jours</strong> apres la generation du dossier, puis
          supprimees automatiquement. Les donnees de facturation sont conservees
          conformement aux obligations legales comptables (10 ans).
        </p>
      </section>

      <hr className="border-gris-bordure mb-8" />

      <section className="mb-8">
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">
          4. Sous-traitants
        </h2>
        <p className="mb-3">
          Nous faisons appel aux sous-traitants suivants pour le fonctionnement
          du service :
        </p>
        <table className="w-full border-collapse mb-3 text-[14px]">
          <thead>
            <tr className="border-b-2 border-gris-bordure">
              <th className="text-left py-2 pr-4 font-bold text-gris-titre">
                Sous-traitant
              </th>
              <th className="text-left py-2 pr-4 font-bold text-gris-titre">
                Fonction
              </th>
              <th className="text-left py-2 font-bold text-gris-titre">
                Localisation
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gris-bordure">
              <td className="py-2 pr-4">Anthropic</td>
              <td className="py-2 pr-4">
                Analyse de l&apos;amende et generation du dossier
              </td>
              <td className="py-2">Etats-Unis</td>
            </tr>
            <tr className="border-b border-gris-bordure">
              <td className="py-2 pr-4">Stripe</td>
              <td className="py-2 pr-4">Traitement des paiements</td>
              <td className="py-2">Etats-Unis</td>
            </tr>
            <tr className="border-b border-gris-bordure">
              <td className="py-2 pr-4">Resend</td>
              <td className="py-2 pr-4">Envoi d&apos;emails transactionnels</td>
              <td className="py-2">Etats-Unis</td>
            </tr>
            <tr className="border-b border-gris-bordure">
              <td className="py-2 pr-4">Vercel</td>
              <td className="py-2 pr-4">Hebergement du site</td>
              <td className="py-2">Etats-Unis</td>
            </tr>
          </tbody>
        </table>
        <p className="text-[13px] text-gris-mention">
          Les transferts de donnees vers les Etats-Unis sont encadres par les
          clauses contractuelles types de la Commission europeenne.
        </p>
      </section>

      <hr className="border-gris-bordure mb-8" />

      <section className="mb-8">
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">
          5. Vos droits
        </h2>
        <p className="mb-3">
          Conformement au RGPD, vous disposez des droits suivants sur vos
          donnees personnelles :
        </p>
        <ul className="list-disc pl-6 space-y-1 mb-3">
          <li>
            <strong>Droit d&apos;acces :</strong> obtenir une copie de vos
            donnees
          </li>
          <li>
            <strong>Droit de rectification :</strong> corriger des donnees
            inexactes
          </li>
          <li>
            <strong>Droit de suppression :</strong> demander
            l&apos;effacement de vos donnees
          </li>
          <li>
            <strong>Droit a la portabilite :</strong> recevoir vos donnees
            dans un format structure
          </li>
          <li>
            <strong>Droit d&apos;opposition :</strong> vous opposer au
            traitement de vos donnees
          </li>
          <li>
            <strong>Droit a la limitation :</strong> restreindre le traitement
            de vos donnees
          </li>
        </ul>
        <p className="mb-2">
          Pour exercer ces droits, contactez-nous a{" "}
          <a
            href="mailto:dpo@conteste.app"
            className="text-bleu-france hover:text-bleu-france-hover underline"
          >
            dpo@conteste.app
          </a>
          . Nous repondons dans un delai de 30 jours.
        </p>
        <p>
          Vous disposez egalement du droit d&apos;introduire une reclamation
          aupres de la CNIL :{" "}
          <a
            href="https://www.cnil.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bleu-france hover:text-bleu-france-hover underline"
          >
            www.cnil.fr
          </a>
        </p>
      </section>

      <hr className="border-gris-bordure mb-8" />

      <section>
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">
          6. Cookies
        </h2>
        <p className="mb-2">
          Le site conteste.app utilise uniquement des{" "}
          <strong>cookies strictement necessaires</strong> au fonctionnement du
          service (cookies de session, preferences). Aucun cookie de tracking
          publicitaire ou analytique n&apos;est utilise.
        </p>
        <p>
          Aucun consentement n&apos;est donc requis pour ces cookies
          conformement aux recommandations de la CNIL.
        </p>
      </section>
    </div>
  );
}
