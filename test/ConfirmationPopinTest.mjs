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

  it("devrait émettre un évenement 'confirm' en cas de confirmation", (done) => {
    const popin = document.createElement("confirmation-popin");
    popin.addEventListener("confirm", () => {
      done();
    });

    const buttons = popin.shadowRoot.querySelectorAll("button");
    const confirmButton = Array.from(buttons).find(
      (b) => b.innerHTML === "Confirmer"
    );
    confirmButton.click();
  });

  it("devrait émettre un évenement 'confirm' en cas de confirmation", (done) => {
    const popin = document.createElement("confirmation-popin");
    popin.addEventListener("cancel", () => {
      done();
    });

    const buttons = popin.shadowRoot.querySelectorAll("button");
    const cancelButton = Array.from(buttons).find(
      (b) => b.innerHTML === "Annuler"
    );
    cancelButton.click();
  });

  it("peut avoir un titre personnalisé", () => {
    document.body.innerHTML =
      '<confirmation-popin title="Titre de test"></confirmation-popin>';
    const popin = document.querySelector("confirmation-popin");
    expect(popin.shadowRoot.querySelector("header").innerText).to.equal(
      "Titre de test"
    );
  });

  it("peut avoir une question personnalisée", () => {
    document.body.innerHTML =
      "<confirmation-popin question=\"C'est sûr c'est certain ?\"></confirmation-popin>";
    const popin = document.querySelector("confirmation-popin");
    expect(popin.shadowRoot.querySelector("p").innerHTML).to.equal(
      "C'est sûr c'est certain ?"
    );
  });
});
