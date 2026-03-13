import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Conteste.app",
  description:
    "Contactez l'equipe Conteste.app. Nous repondons sous 48h.",
};

export default function Contact() {
  return (
    <div className="max-w-[700px] mx-auto px-6 py-10 text-[15px] text-gris-texte">
      <h1 className="text-[22px] font-bold text-gris-titre mb-6">
        Nous contacter
      </h1>

      <section className="mb-8">
        <p className="mb-4">
          Une question, un probleme ou une demande de remboursement ? Ecrivez-nous,
          nous repondons sous <strong>48h</strong>.
        </p>
        <p className="mb-6">
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

      <section>
        <h2 className="text-[18px] font-bold text-gris-titre mb-4">
          Formulaire de contact
        </h2>
        <form className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-[14px] font-bold text-gris-titre mb-1"
            >
              Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Votre nom"
              className="w-full border border-gris-bordure rounded px-3 py-2.5 text-[15px] text-gris-texte focus:outline-none focus:border-bleu-france focus:ring-1 focus:ring-bleu-france"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-[14px] font-bold text-gris-titre mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="votre@email.fr"
              className="w-full border border-gris-bordure rounded px-3 py-2.5 text-[15px] text-gris-texte focus:outline-none focus:border-bleu-france focus:ring-1 focus:ring-bleu-france"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-[14px] font-bold text-gris-titre mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Decrivez votre demande..."
              className="w-full border border-gris-bordure rounded px-3 py-2.5 text-[15px] text-gris-texte focus:outline-none focus:border-bleu-france focus:ring-1 focus:ring-bleu-france resize-y"
            />
          </div>
          <button
            type="submit"
            className="bg-bleu-france text-white font-bold text-[15px] px-8 py-3 rounded hover:bg-bleu-france-hover transition-colors min-h-[48px]"
          >
            Envoyer
          </button>
          <p className="text-[13px] text-gris-mention">
            Ce formulaire n&apos;est pas encore fonctionnel. En attendant,
            ecrivez-nous directement a contact@conteste.app.
          </p>
        </form>
      </section>
    </div>
  );
}
