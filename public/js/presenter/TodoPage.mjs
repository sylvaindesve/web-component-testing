import { toggleItem } from "../model/actions.mjs";
import { selectItems } from "../model/reducer.mjs";
import { TodoListView } from "../view/TodoListView.mjs";

export class TodoPage {
  #store;

  /**
   * @type {TodoListView}
   */
  #todoListView;

  constructor(store, todoListView) {
    this.#store = store;

    this.#todoListView = todoListView;
    this.#todoListView.addEventListener("toggle", (event) => {
      this.#toggleItem(event.detail.itemId);
    });

    this.#store.subscribe(() => this.#updateView());
  }

  #getItems() {
    return selectItems(this.#store.getState());
  }

  #updateView() {
    this.#todoListView.items = this.#getItems();
  }

  #toggleItem(itemId) {
    this.#store.dispatch(toggleItem(itemId));
  }
}
