import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScoreBadge } from "@/components/ui/ScoreBadge";

describe("ScoreBadge", () => {
  it("rendu avec niveau fort affiche les classes vertes et le bon texte", () => {
    render(<ScoreBadge score={85} niveau="fort" />);

    const badge = screen.getByText(/85\/100/);
    expect(badge).toBeInTheDocument();
    expect(badge.textContent).toContain("Chances elevees");
    expect(badge.className).toContain("bg-vert-fond");
    expect(badge.className).toContain("text-vert-succes");
  });

  it("rendu avec niveau moyen affiche les classes oranges et le bon texte", () => {
    render(<ScoreBadge score={55} niveau="moyen" />);

    const badge = screen.getByText(/55\/100/);
    expect(badge).toBeInTheDocument();
    expect(badge.textContent).toContain("Chances moderees");
    expect(badge.className).toContain("bg-score-moyen-fond");
    expect(badge.className).toContain("text-score-moyen-texte");
  });

  it("rendu avec niveau faible affiche les classes rouges/oranges et le bon texte", () => {
    render(<ScoreBadge score={20} niveau="faible" />);

    const badge = screen.getByText(/20\/100/);
    expect(badge).toBeInTheDocument();
    expect(badge.textContent).toContain("Chances faibles");
    expect(badge.className).toContain("bg-orange-fond");
    expect(badge.className).toContain("text-orange-warning");
  });

  it("rendu avec score 0 affiche correctement", () => {
    render(<ScoreBadge score={0} niveau="faible" />);

    const badge = screen.getByText(/0\/100/);
    expect(badge).toBeInTheDocument();
  });

  it("rendu avec score 100 affiche correctement", () => {
    render(<ScoreBadge score={100} niveau="fort" />);

    const badge = screen.getByText(/100\/100/);
    expect(badge).toBeInTheDocument();
    expect(badge.textContent).toContain("Chances elevees");
  });
});
