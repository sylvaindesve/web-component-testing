import { TodoItemView } from "./TodoItemView.mjs";

/**
 * @typedef {Object} ItemProps
 * @property {string} id
 * @property {string} title
 * @property {boolean} completed
 */

export class TodoListView extends HTMLElement {
  static getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `<ul class="todo-list"><slot></slot></ul>`;
    return template;
  }

  /**
   * @type {ItemProps[]}
   */
  #items = [];

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.#render();
  }

  get items() {
    return this.#items;
  }

  set items(newItems) {
    this.#items = newItems;
    this.#update();
  }

  #render() {
    this.shadowRoot.appendChild(
      TodoListView.getTemplate().content.cloneNode(true)
    );
  }

  #update() {
    this.replaceChildren();
    for (const item of this.#items) {
      const itemView = new TodoItemView();
      itemView.dataset.id = item.id;
      itemView.setAttribute("title", item.title);
      if (item.completed) {
        itemView.setAttribute("checked", "checked");
      }
      itemView.addEventListener("toggle", () =>
        this.#dispatchToggleItem(item.id)
      );
      this.append(itemView);
    }
  }

  #dispatchToggleItem(itemId) {
    this.dispatchEvent(new CustomEvent("toggle", { detail: { itemId } }));
  }
}

if (!window.customElements.get("todo-list")) {
  window.customElements.define("todo-list", TodoListView);
}
