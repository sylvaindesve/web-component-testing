import { expect } from "chai";
import { TodoItemView } from "../../public/js/view/TodoItemView.mjs";

describe("TodoItemView", () => {
  it("should render the item title", () => {
    document.body.innerHTML = `<todo-item title="Titre de test"></todo-item>`;
    const todoItem = document.querySelector("todo-item");
    expect(todoItem.shadowRoot.querySelector("label").innerHTML).to.equal(
      "Titre de test"
    );
  });

  it("should update when title is changed", () => {
    document.body.innerHTML = `<todo-item title="Titre de test"></todo-item>`;
    const todoItem = document.querySelector("todo-item");
    todoItem.setAttribute("title", "nouveau titre");
    expect(todoItem.shadowRoot.querySelector("label").innerHTML).to.equal(
      "nouveau titre"
    );
  });
});
