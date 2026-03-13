/**
 * Template email de confirmation de paiement.
 * Utilise React Email (compatible Resend).
 *
 * Regle : le mot "amendes" doit apparaitre au moins une fois.
 */

import type { PackResult } from "@/lib/types";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
  Heading,
} from "@react-email/components";

interface ConfirmationPaiementProps {
  prenom: string;
  numeroDossier: string;
  typeAmende: string;
  montantAmende: string;
  dateLimite: string;
  lienDossier: string;
  pack?: PackResult;
}

export function ConfirmationPaiement({
  prenom,
  numeroDossier,
  typeAmende,
  montantAmende,
  dateLimite,
  lienDossier,
  pack,
}: ConfirmationPaiementProps) {
  return (
    <Html lang="fr">
      <Head />
      <Body
        style={{
          fontFamily: "Marianne, Arial, sans-serif",
          backgroundColor: "#F6F6F6",
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            maxWidth: 600,
            margin: "0 auto",
            backgroundColor: "#FFFFFF",
          }}
        >
          {/* Header */}
          <Section
            style={{
              borderBottom: "3px solid #000091",
              padding: "16px 24px",
            }}
          >
            <Text
              style={{
                color: "#000091",
                fontSize: 20,
                fontWeight: 700,
                margin: 0,
              }}
            >
              conteste.app
            </Text>
          </Section>

          {/* Contenu principal */}
          <Section style={{ padding: "24px" }}>
            <Heading
              as="h1"
              style={{
                color: "#161616",
                fontSize: 22,
                fontWeight: 800,
                marginBottom: 16,
              }}
            >
              Votre dossier de contestation d&apos;amende est pret
            </Heading>

            <Text style={{ color: "#3A3A3A", fontSize: 15, lineHeight: "1.6" }}>
              Bonjour {prenom},
            </Text>

            <Text style={{ color: "#3A3A3A", fontSize: 15, lineHeight: "1.6" }}>
              Votre dossier <strong>n&deg;{numeroDossier}</strong> a ete genere
              avec succes. Retrouvez ci-dessous le recapitulatif de votre
              amende et vos arguments personnalises.
            </Text>

            {/* Récap amende */}
            <Section
              style={{
                background: "#F5F5FE",
                borderRadius: 8,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <Text style={{ margin: 0, fontSize: 14, color: "#3A3A3A" }}>
                <strong>Type :</strong> {typeAmende}
              </Text>
              <Text
                style={{ margin: "4px 0 0", fontSize: 14, color: "#3A3A3A" }}
              >
                <strong>Montant :</strong> {montantAmende}
              </Text>
              <Text
                style={{ margin: "4px 0 0", fontSize: 14, color: "#3A3A3A" }}
              >
                <strong>Date limite de contestation :</strong> {dateLimite}
              </Text>
            </Section>

            {/* Arguments */}
            {pack && pack.arguments.length > 0 && (
              <>
                <Heading
                  as="h2"
                  style={{
                    color: "#161616",
                    fontSize: 18,
                    fontWeight: 700,
                    marginTop: 24,
                    marginBottom: 12,
                  }}
                >
                  Vos arguments
                </Heading>
                {pack.arguments.map((arg, i) => (
                  <Section
                    key={i}
                    style={{
                      borderLeft: "4px solid #000091",
                      paddingLeft: 16,
                      marginBottom: 16,
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: 700,
                        color: "#161616",
                        fontSize: 15,
                        marginBottom: 4,
                      }}
                    >
                      {i + 1}. {arg.titre}
                    </Text>
                    <Text
                      style={{
                        color: "#3A3A3A",
                        fontSize: 14,
                        lineHeight: "1.5",
                      }}
                    >
                      {arg.explication}
                    </Text>
                  </Section>
                ))}
              </>
            )}

            {/* Guide ANTAI */}
            {pack && pack.guideAntai.etapes.length > 0 && (
              <>
                <Heading
                  as="h2"
                  style={{
                    color: "#161616",
                    fontSize: 18,
                    fontWeight: 700,
                    marginTop: 24,
                    marginBottom: 12,
                  }}
                >
                  Guide de contestation
                </Heading>
                {pack.guideAntai.etapes.map((etape) => (
                  <Text
                    key={etape.numero}
                    style={{
                      color: "#3A3A3A",
                      fontSize: 14,
                      lineHeight: "1.5",
                      marginBottom: 8,
                    }}
                  >
                    <strong style={{ color: "#000091" }}>
                      Etape {etape.numero} :
                    </strong>{" "}
                    <strong>{etape.action}</strong> &mdash; {etape.detail}
                  </Text>
                ))}
              </>
            )}

            {/* Motif recommandé */}
            {pack && pack.guideAntai.motifRecommande && (
              <Section
                style={{
                  border: "2px solid #000091",
                  borderRadius: 8,
                  padding: 16,
                  marginTop: 24,
                  marginBottom: 16,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#000091",
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.5px",
                    marginBottom: 8,
                  }}
                >
                  Motif de contestation &mdash; a copier
                </Text>
                <Text
                  style={{
                    color: "#3A3A3A",
                    fontSize: 14,
                    lineHeight: "1.6",
                    fontStyle: "italic",
                    fontWeight: 700,
                  }}
                >
                  {pack.guideAntai.motifRecommande}
                </Text>
              </Section>
            )}

            {/* Rappel date limite */}
            <Text
              style={{
                color: "#D64D00",
                fontSize: 14,
                fontWeight: 700,
                marginTop: 16,
              }}
            >
              Rappel : vous avez jusqu&apos;au {dateLimite} pour contester
              votre amende.
            </Text>

            {/* CTA */}
            <Section style={{ textAlign: "center" as const, marginTop: 24 }}>
              <Link
                href={lienDossier}
                style={{
                  display: "inline-block",
                  background: "#000091",
                  color: "white",
                  padding: "14px 32px",
                  borderRadius: 4,
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Acceder a mon dossier &rarr;
              </Link>
            </Section>

            <Text
              style={{
                marginTop: 24,
                fontSize: 14,
                color: "#666666",
              }}
            >
              Nous vous recontacterons dans 60 jours pour savoir si votre
              contestation a abouti.
            </Text>

            <Hr
              style={{
                border: "none",
                borderTop: "1px solid #DDDDDD",
                margin: "24px 0",
              }}
            />

            {/* Bloc referral */}
            <Section
              style={{
                background: "#F6F6F6",
                borderRadius: 8,
                padding: 16,
                marginBottom: 16,
              }}
            >
              <Text
                style={{ fontSize: 13, color: "#666666", lineHeight: "1.5" }}
              >
                Un ami vient de recevoir une amende ? Ne supprimez pas cet
                email &mdash; tapez &quot;amendes&quot; dans votre recherche
                d&apos;emails pour retrouver ce lien le jour ou vous en aurez
                besoin.
              </Text>
              <Link
                href="https://conteste.app"
                style={{ color: "#000091", fontSize: 14, fontWeight: 700 }}
              >
                &rarr; conteste.app
              </Link>
            </Section>

            {/* Footer */}
            <Hr
              style={{
                border: "none",
                borderTop: "1px solid #DDDDDD",
                margin: "16px 0",
              }}
            />
            <Text style={{ fontSize: 11, color: "#999999", lineHeight: "1.4" }}>
              Conteste.app est un outil d&apos;aide a la decision. Ce n&apos;est
              pas un cabinet d&apos;avocats. Aucune garantie de resultat
              n&apos;est fournie.
            </Text>
            <Text style={{ fontSize: 11, color: "#999999" }}>
              <Link
                href="https://conteste.app/unsubscribe"
                style={{ color: "#999999" }}
              >
                Se desinscrire
              </Link>{" "}
              &middot;{" "}
              <Link
                href="https://conteste.app/mentions-legales"
                style={{ color: "#999999" }}
              >
                Mentions legales
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
