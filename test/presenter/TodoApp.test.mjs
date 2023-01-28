import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import { TodoApp } from "../../public/js/presenter/TodoApp.mjs";

chai.use(sinonChai);

const fakeStore = {
  subscribe: sinon.fake(),
};

class FakeTodoListView {}

class FakeTodoItemView {}

describe("TodoApp", () => {
  describe("renderTo", () => {
    it("should append a list view to provided element", () => {
      const app = new TodoApp(fakeStore, FakeTodoListView, FakeTodoItemView);
      const fakeElement = {
        append: sinon.fake(),
      };
      app.renderTo(fakeElement);
      expect(fakeElement.append).to.have.been.called;
    });
  });
});
