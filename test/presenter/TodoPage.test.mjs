import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import { TodoPage } from "../../public/js/presenter/TodoPage.mjs";

chai.use(sinonChai);

describe("TodoPage", () => {
  it("should update items when the state changes", () => {
    const fakeStore = {
      getState: function () {
        return {
          items: {
            "49b6c1cd-25e2-4d84-b37d-768fccd59b24": {
              id: "49b6c1cd-25e2-4d84-b37d-768fccd59b24",
              title: "Acheter du beurre de cacahuète",
              completed: true,
            },
            "b9929567-1cb7-4b35-9c4d-bae2b8ee625c": {
              id: "b9929567-1cb7-4b35-9c4d-bae2b8ee625c",
              title: "Trouver du bon café",
              completed: false,
            },
          },
        };
      },
      subscribe: function (listener) {
        this.listener = listener;
      },
      trigger: function () {
        this.listener(this.getState());
      },
    };

    const fakeView = {
      items: [],
      addEventListener: sinon.fake(),
    };

    const page = new TodoPage(fakeStore, fakeView);
    fakeStore.trigger();
    expect(fakeView.items).to.deep.equal([
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
    ]);
  });

  it("should dispatch item toggling to the store", () => {
    const fakeStore = {
      subscribe: sinon.fake(),
      dispatch: sinon.fake(),
    };

    const fakeView = {
      items: [],
      addEventListener: function (_eventName, listener) {
        this.listener = listener;
      },
      trigger: function () {
        this.listener({ detail: { itemId: "some id" } });
      },
    };

    const page = new TodoPage(fakeStore, fakeView);
    fakeView.trigger();
    expect(fakeStore.dispatch).to.have.been.called;
    expect(fakeStore.dispatch.firstCall.firstArg).to.deep.equal({
      type: "TOGGLE_ITEM",
      payload: "some id",
    });
  });
});
