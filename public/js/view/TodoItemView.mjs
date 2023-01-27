export class TodoItemView extends HTMLElement {
  static getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `<li class="todo-item"><label></label></li>`;
    return template;
  }

  static get observedAttributes() {
    return ["title"];
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

  #render() {
    this.shadowRoot.appendChild(
      TodoItemView.getTemplate().content.cloneNode(true)
    );
  }

  #update() {
    this.shadowRoot.querySelector("label").innerHTML = `${this.#getTitle()}`;
  }

  attributeChangedCallback(_name, _oldValue, _newValue) {
    this.#update();
  }
}
