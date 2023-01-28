import { TodoItemView } from "./view/TodoItemView.mjs";
import { TodoListView } from "./view/TodoListView.mjs";

import { StateStore } from "./model/StateStore.mjs";
import reducer from "./model/reducer.mjs";
import { TodoApp } from "./presenter/TodoApp.mjs";
import { replaceItems } from "./model/actions.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const store = new StateStore(reducer);
  const app = new TodoApp(store);
  app.renderTo(document.getElementById("root"));

  store.dispatch(
    replaceItems([
      {
        id: "280652c3-b823-472c-9386-9a511d299f1b",
        title: "Faire du sport",
        completed: false,
      },
      {
        id: "f6ef974a-104d-431e-8262-c5ce06b22c1f",
        title: "Bien dormir",
        completed: false,
      },
    ])
  );
});
