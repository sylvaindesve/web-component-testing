import { expect } from "chai";
import { TodoApp } from "../../public/js/presenter/TodoApp.mjs";

const fakeStore = {
  subscribe: (_callback) => {},
};

class FakeTodoListView {}

class FakeTodoItemView {}

function fakeFunction() {
  const fn = function callback() {
    callback.called = true;
    return;
  };
  fn.called = false;
  return fn;
}

describe("TodoApp", () => {
  describe("renderTo", () => {
    it("should append a list view to provided element", () => {
      const app = new TodoApp(fakeStore, FakeTodoListView, FakeTodoItemView);
      const fakeElement = {
        append: fakeFunction(),
      };
      app.renderTo(fakeElement);
      expect(fakeElement.append.called).to.be.true;
    });
  });
});
