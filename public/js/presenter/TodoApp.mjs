import { selectItems } from "../model/reducer.mjs";

export class TodoApp {
  constructor(store) {
    this.store = store;
    store.subscribe(() => this.#updateItems());
  }

  renderTo(el) {
    const todoListNode = document.createElement("todo-list");
    el.append(todoListNode);
  }

  #updateItems() {
    const items = selectItems(this.store.getState());
    const todoListView = document.querySelector("todo-list");
    for (const item of items) {
      const todoItemView = document.createElement("todo-item");
      todoItemView.setAttribute("title", item.title);
      todoItemView.dataset.id = item.id;
      todoListView.append(todoItemView);
    }
  }
}
