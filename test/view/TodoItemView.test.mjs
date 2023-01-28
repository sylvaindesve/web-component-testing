import { expect } from "chai";
import { TodoItemView } from "../../public/js/view/TodoItemView.mjs";

function createCallback() {
  const fn = function callback() {
    callback.called = true;
    return;
  };
  fn.called = false;
  return fn;
}

describe("TodoItemView", () => {
  it("should render the title", () => {
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

  it("should render the checked status when unchecked", () => {
    document.body.innerHTML = `<todo-item title="Titre de test"></todo-item>`;
    const todoItem = document.querySelector("todo-item");
    expect(todoItem.shadowRoot.querySelector("input[type='checkbox']").checked)
      .to.be.false;
  });

  it("should render the checked status when checked", () => {
    document.body.innerHTML = `<todo-item title="Titre de test" checked="checked"></todo-item>`;
    const todoItem = document.querySelector("todo-item");
    expect(todoItem.shadowRoot.querySelector("input[type='checkbox']").checked)
      .to.be.true;
  });

  it("should dispatch a 'toggle' event when the checkbox is checked", () => {
    document.body.innerHTML = `<todo-item title="Titre de test"></todo-item>`;
    const todoItem = document.querySelector("todo-item");
    const callback = createCallback();
    todoItem.addEventListener("toggle", callback);
    todoItem.shadowRoot.querySelector("input[type='checkbox']").click();
    expect(callback.called).to.be.true;
  });

  it("should dispatch a 'toggle' event when the checkbox is unchecked", () => {
    document.body.innerHTML = `<todo-item title="Titre de test" checked="checked"></todo-item>`;
    const todoItem = document.querySelector("todo-item");
    const callback = createCallback();
    todoItem.addEventListener("toggle", callback);
    todoItem.shadowRoot.querySelector("input[type='checkbox']").click();
    expect(callback.called).to.be.true;
  });
});
