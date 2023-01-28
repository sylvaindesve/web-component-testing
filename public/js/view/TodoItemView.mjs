export class TodoItemView extends HTMLElement {
  static getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `<li class="todo-item"><input type="checkbox" /><label></label></li>`;
    return template;
  }

  static get observedAttributes() {
    return ["title", "checked"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#render();
    this.#update();
  }

  #getTitle() {
    return this.getAttribute("title");
  }

  #isChecked() {
    return this.hasAttribute("checked");
  }

  #getCheckboxInput() {
    return this.shadowRoot.querySelector("input");
  }

  #render() {
    this.shadowRoot.appendChild(
      TodoItemView.getTemplate().content.cloneNode(true)
    );
    this.#getCheckboxInput().addEventListener("change", () => {
      this.dispatchEvent(new Event("toggle"));
    });
  }

  #update() {
    this.shadowRoot.querySelector("label").innerHTML = `${this.#getTitle()}`;
    this.#getCheckboxInput().checked = this.#isChecked();
  }

  attributeChangedCallback(_name, _oldValue, _newValue) {
    this.#update();
  }
}

if (!window.customElements.get("todo-item")) {
  window.customElements.define("todo-item", TodoItemView);
}
