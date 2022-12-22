const css = `
<style>
  :host {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 20;
    margin-top: -100px;
    margin-left: -150px;
    background: #FFF;
    padding: 10px;
    width: 280px;
  }
  
  :host:after {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -2;
    background: rgba(0,0,0,0.5);
    content: "";
  }
  
  :host:before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    border-radius: 10px;
    background: #FFF;
    content: "";
  }

  header {
    font-weight: bold;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .actions li {
  }

  button {
    appearance: none;
    margin: 5px;
    border: 1px solid rgba(27, 31, 36, 0.15);
    border-radius: 6px;
    background-color: rgb(246, 248, 250);
    cursor: pointer;
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
      this.shadowRoot.querySelector("header").innerHTML =
        this.getAttribute("title");
    }
    if (this.getAttribute("question")) {
      this.shadowRoot.querySelector("p").innerHTML =
        this.getAttribute("question");
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
