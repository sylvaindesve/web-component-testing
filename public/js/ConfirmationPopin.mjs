const css = `
<style>
  header {
    color: red;
  }
</style>
`;

const template = document.createElement("template");
template.innerHTML += `
  ${css}
  <header>Confirmation</header>
  <p>Êtes-vous sûr ?</p>
  <ul>
    <li>
      <button class="cancel">Annuler</button>
    </li>
    <li>
      <button class="confirm">Confirmer</button>
    </li>
  </ul>
`;

export class ConfirmationPopin extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
window.customElements.define("confirmation-popin", ConfirmationPopin);
