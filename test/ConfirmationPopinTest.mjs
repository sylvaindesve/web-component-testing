import { expect } from "chai";
import { ConfirmationPopin } from "../public/js/ConfirmationPopin.mjs";

describe("ConfirmationPopin", () => {
  it("devrait avoir un titre par défaut", () => {
    const popin = document.createElement("confirmation-popin");
    expect(popin.shadowRoot.textContent).to.contain("Confirmation");
  });

  it("devrait avoir une question par défaut", () => {
    const popin = document.createElement("confirmation-popin");
    expect(popin.shadowRoot.textContent).to.contain("Êtes-vous sûr ?");
  });

  it("devrait avoir 2 boutons", () => {
    const popin = document.createElement("confirmation-popin");
    expect(popin.shadowRoot.querySelectorAll("button").length).to.equal(2);
  });

  it("devrait avoir un bouton 'Confirmer' par défaut", () => {
    const popin = document.createElement("confirmation-popin");
    const buttons = popin.shadowRoot.querySelectorAll("button");
    expect(Array.from(buttons).map((b) => b.innerHTML)).to.contain("Confirmer");
  });

  it("devrait avoir un bouton 'Annuler' par défaut", () => {
    const popin = document.createElement("confirmation-popin");
    const buttons = popin.shadowRoot.querySelectorAll("button");
    expect(Array.from(buttons).map((b) => b.innerHTML)).to.contain("Annuler");
  });
});
