import { selectItems } from "../model/reducer.mjs";

export class TodoApp {
  #store;
  #todoListViewConstructor;
  #todoItemViewConstructor;
  #todoListView;

  constructor(store, todoListViewConstructor, todoItemViewConstructor) {
    this.#store = store;
    this.#todoListViewConstructor = todoListViewConstructor;
    this.#todoItemViewConstructor = todoItemViewConstructor;

    this.#store.subscribe(() => this.#updateItems());
  }

  renderTo(el) {
    this.#todoListView = new this.#todoListViewConstructor();
    el.append(this.#todoListView);
  }

  #updateItems() {
    const items = selectItems(this.#store.getState());

    for (const item of items) {
      const todoItemView = new this.#todoItemViewConstructor();
      todoItemView.setAttribute("title", item.title);
      todoItemView.dataset.id = item.id;
      if (item.completed) {
        todoItemView.setAttribute("checked", "checked");
      }
      this.#todoListView.append(todoItemView);
    }
  }
}
