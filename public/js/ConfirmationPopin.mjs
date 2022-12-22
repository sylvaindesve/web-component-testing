const css = `
<style>
  :host {
    color: rgb(36, 41, 47);
    display: block;
    font-family: Helvetica;
    margin: 70px auto;
    padding: 10px;
    background: #fff;
    border: 1px solid rgb(36, 41, 47);
    border-radius: 5px;
    width: 30%;
    position: relative;
  }

  header {
    font-weight: bold;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .actions li {
  }

  button {
    appearance: none;
    background-color: rgb(246, 248, 250);
    border-radius: 6px;
    border: 1px solid rgba(27, 31, 36, 0.15);
    cursor: pointer;
    margin: 5px;
    padding: 5px 16px;
  }
  button:hover {
    background-color: rgb(243, 244, 246);
  }
</style>
`;

const template = document.createElement("template");
template.innerHTML += `
  ${css}
  <header>Confirmation</header>
  <p>Êtes-vous sûr ?</p>
  <ul class="actions">
    <li>
      <button id="cancel">Annuler</button>
    </li>
    <li>
      <button id="confirm">Confirmer</button>
    </li>
  </ul>
`;

export class ConfirmationPopin extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
    this.attachListeners();
  }

  render() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    if (this.getAttribute("title")) {
      this.shadowRoot.querySelector("header").innerText =
        this.getAttribute("title");
    }
  }

  attachListeners() {
    this.shadowRoot.getElementById("confirm").addEventListener("click", () => {
      this.dispatchEvent(new Event("confirm"));
    });
    this.shadowRoot.getElementById("cancel").addEventListener("click", () => {
      this.dispatchEvent(new Event("cancel"));
    });
  }
}
window.customElements.define("confirmation-popin", ConfirmationPopin);
