import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions generales d'utilisation — Conteste.app",
  description:
    "Conditions generales d'utilisation du service Conteste.app. Lisez nos CGU avant d'utiliser le service.",
};

export default function CGU() {
  return (
    <div className="max-w-[700px] mx-auto px-6 py-10 text-[15px] text-gris-texte">
      <h1 className="text-[22px] font-bold text-gris-titre mb-2">
        Conditions generales d&apos;utilisation
      </h1>
      <p className="text-[13px] text-gris-mention mb-8">
        Derniere mise a jour : mars 2026
      </p>

      <section className="mb-8">
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">
          Article 1 — Objet
        </h2>
        <p>
          Les presentes conditions generales d&apos;utilisation (ci-apres
          &laquo;&nbsp;CGU&nbsp;&raquo;) ont pour objet de definir les modalites
          d&apos;acces et d&apos;utilisation du service propose par
          conteste.app.
        </p>
      </section>

      <hr className="border-gris-bordure mb-8" />

      <section className="mb-8">
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">
          Article 2 — Description du service
        </h2>
        <p className="mb-2">
          Conteste.app est un <strong>outil d&apos;aide a la decision</strong>{" "}
          qui permet aux utilisateurs d&apos;analyser leurs chances de contester
          une amende de circulation. Le service comprend :
        </p>
        <ul className="list-disc pl-6 space-y-1 mb-3">
          <li>
            L&apos;analyse automatisee de la photo de l&apos;avis de
            contravention
          </li>
          <li>
            L&apos;attribution d&apos;un score de contestabilite personnalise
          </li>
          <li>
            La generation d&apos;arguments juridiques adaptes a la situation
          </li>
          <li>
            Un guide etape par etape pour effectuer la demarche sur le portail
            ANTAI
          </li>
        </ul>
        <div className="bg-orange-fond border-l-4 border-orange-warning p-4 rounded-r">
          <p className="font-bold text-orange-warning mb-1">Important</p>
          <p>
            Conteste.app <strong>n&apos;est pas un cabinet d&apos;avocats</strong> et
            ne fournit pas de conseil juridique. Aucune garantie de resultat
            n&apos;est fournie. La demarche de contestation est effectuee par
            l&apos;utilisateur lui-meme via les portails officiels (ANTAI,
            Telerecours).
          </p>
        </div>
      </section>

      <hr className="border-gris-bordure mb-8" />

      <section className="mb-8">
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">
          Article 3 — Acceptation des CGU
        </h2>
        <p>
          L&apos;utilisation du service implique l&apos;acceptation pleine et
          entiere des presentes CGU. L&apos;utilisateur reconnait en avoir pris
          connaissance avant tout achat.
        </p>
      </section>

      <hr className="border-gris-bordure mb-8" />

      <section className="mb-8">
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">
          Article 4 — Tarifs et paiement
        </h2>
        <p className="mb-2">
          L&apos;analyse initiale (score et apercu des arguments) est{" "}
          <strong>gratuite</strong>.
        </p>
        <p className="mb-2">
          L&apos;acces au dossier complet (arguments detailles, lettre type et
          guide ANTAI) est propose au prix de{" "}
          <strong>14,90&nbsp;&euro; TTC</strong>.
        </p>
        <p className="mb-2">
          Le paiement est effectue par carte bancaire via la plateforme
          securisee Stripe. Le paiement couvre l&apos;analyse personnalisee et
          la generation du guide de contestation, et non le resultat de la
          demarche.
        </p>
      </section>

      <hr className="border-gris-bordure mb-8" />

      <section className="mb-8">
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">
          Article 5 — Droit de retractation
        </h2>
        <p className="mb-2">
          Conformement aux articles L.221-18 et suivants du Code de la
          consommation, l&apos;utilisateur dispose d&apos;un delai de{" "}
          <strong>14 jours</strong> a compter de l&apos;achat pour exercer son
          droit de retractation, sans avoir a justifier de motifs ni a payer de
          penalites.
        </p>
        <p>
          Pour exercer ce droit, l&apos;utilisateur peut adresser sa demande a{" "}
          <a
            href="mailto:contact@conteste.app"
            className="text-bleu-france hover:text-bleu-france-hover underline"
          >
            contact@conteste.app
          </a>
          . Le remboursement sera effectue dans un delai de 14 jours a compter
          de la reception de la demande.
        </p>
      </section>

      <hr className="border-gris-bordure mb-8" />

      <section className="mb-8">
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">
          Article 6 — Responsabilite
        </h2>
        <p className="mb-2">
          L&apos;utilisateur est seul responsable de l&apos;utilisation
          qu&apos;il fait des informations et documents generes par le service.
          Conteste.app ne saurait etre tenu responsable :
        </p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Du rejet d&apos;une contestation par l&apos;administration</li>
          <li>
            De toute consequence liee a la decision de contester ou non une
            amende
          </li>
          <li>
            D&apos;une interruption temporaire du service pour maintenance
          </li>
        </ul>
      </section>

      <hr className="border-gris-bordure mb-8" />

      <section className="mb-8">
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">
          Article 7 — Donnees personnelles
        </h2>
        <p className="mb-2">
          Les donnees personnelles collectees dans le cadre du service sont
          traitees conformement au Reglement General sur la Protection des
          Donnees (RGPD). Les donnees sont{" "}
          <strong>supprimees sous 30 jours</strong> apres la generation du
          dossier.
        </p>
        <p>
          Pour plus d&apos;informations, consultez notre{" "}
          <a
            href="/confidentialite"
            className="text-bleu-france hover:text-bleu-france-hover underline"
          >
            politique de confidentialite
          </a>
          .
        </p>
      </section>

      <hr className="border-gris-bordure mb-8" />

      <section className="mb-8">
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">
          Article 8 — Propriete intellectuelle
        </h2>
        <p>
          Les contenus generes par le service (arguments, lettres types, guides)
          sont fournis a l&apos;utilisateur pour son usage personnel et prive.
          Toute revente, diffusion ou exploitation commerciale est strictement
          interdite.
        </p>
      </section>

      <hr className="border-gris-bordure mb-8" />

      <section className="mb-8">
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">
          Article 9 — Modification des CGU
        </h2>
        <p>
          Conteste.app se reserve le droit de modifier les presentes CGU a tout
          moment. Les modifications entrent en vigueur des leur publication sur
          le site. L&apos;utilisateur est invite a consulter regulierement cette
          page.
        </p>
      </section>

      <hr className="border-gris-bordure mb-8" />

      <section>
        <h2 className="text-[18px] font-bold text-gris-titre mb-3">
          Article 10 — Droit applicable et litiges
        </h2>
        <p className="mb-2">
          Les presentes CGU sont soumises au droit francais.
        </p>
        <p>
          En cas de litige, l&apos;utilisateur peut recourir gratuitement a un
          mediateur de la consommation conformement aux articles L.611-1 et
          suivants du Code de la consommation. A defaut de resolution amiable,
          les tribunaux francais seront seuls competents.
        </p>
      </section>
    </div>
  );
}
