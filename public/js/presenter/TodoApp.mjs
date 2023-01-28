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

    this.#store.subscribe(() => this.#updateView());
  }

  renderTo(el) {
    this.#todoListView = new this.#todoListViewConstructor();
    el.append(this.#todoListView);
  }

  #getItems() {
    return selectItems(this.#store.getState());
  }

  #updateView() {
    for (const item of this.#getItems()) {
      this.#todoListView.append(this.#createViewForItem(item));
    }
  }

  #createViewForItem(item) {
    const todoItemView = new this.#todoItemViewConstructor();
    todoItemView.setAttribute("title", item.title);
    todoItemView.dataset.id = item.id;
    if (item.completed) {
      todoItemView.setAttribute("checked", "checked");
    }
    return todoItemView;
  }
}
