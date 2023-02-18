import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import { TodoListView } from "../../public/js/view/TodoListView.mjs";

chai.use(sinonChai);

describe("TodoListView", () => {
  it("should have no item views when isntanciated", () => {
    const view = new TodoListView();
    expect(view.querySelectorAll("todo-item").length).to.equal(0);
  });

  it("should instanciate a view for each item when items is set", () => {
    const view = new TodoListView();
    view.items = [
      {
        id: "49b6c1cd-25e2-4d84-b37d-768fccd59b24",
        title: "Acheter du beurre de cacahuète",
        completed: true,
      },
      {
        id: "b9929567-1cb7-4b35-9c4d-bae2b8ee625c",
        title: "Trouver du bon café",
        completed: false,
      },
    ];
    expect(view.querySelectorAll("todo-item").length).to.equal(2);
  });

  it("should emit a toggle event with item ID when an item is toggled", () => {
    const view = new TodoListView();
    view.items = [
      {
        id: "49b6c1cd-25e2-4d84-b37d-768fccd59b24",
        title: "Acheter du beurre de cacahuète",
        completed: true,
      },
      {
        id: "b9929567-1cb7-4b35-9c4d-bae2b8ee625c",
        title: "Trouver du bon café",
        completed: false,
      },
    ];
    const callback = sinon.fake();
    view.addEventListener("toggle", callback);
    const firstItem = view.querySelector("todo-item");
    firstItem.dispatchEvent(new Event("toggle"));
    expect(callback).to.have.been.called;
    expect(callback.firstCall.firstArg.detail.itemId).to.equal(
      "49b6c1cd-25e2-4d84-b37d-768fccd59b24"
    );
  });
});
