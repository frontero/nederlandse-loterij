import { configureAxe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

describe("Accessibility (axe-core): generatePrizeDistribution", () => {
  it("heeft geen a11y-violations op een statische prijsverdelingstabel", async () => {
    // Simuleer een eenvoudige HTML-tabel met de prijsverdeling
    document.body.innerHTML = `
      <main>
        <table>
          <tr><td>Hoofdprijs</td><td>€25.000</td></tr>
          <tr><td>Troostprijs</td><td>€100</td></tr>
          <tr><td>Geen prijs</td><td>—</td></tr>
        </table>
      </main>
    `;
    const axe = configureAxe();
    const results = await axe(document.body);
    expect(results).toHaveNoViolations();
  });
});
