export class TodoListView extends HTMLElement {
  static getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `<ul class="todo-list"><slot></slot></ul>`;
    return template;
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.#render();
  }

  #render() {
    this.shadowRoot.appendChild(
      TodoListView.getTemplate().content.cloneNode(true)
    );
  }
}
