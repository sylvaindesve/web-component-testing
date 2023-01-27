import { expect } from "chai";
import {
  addItem,
  removeItem,
  toggleItem,
} from "../../public/js/model/actions.mjs";
import reducer from "../../public/js/model/reducer.mjs";

describe("reducer", () => {
  it("should initialize to empty items", () => {
    const initialState = reducer(undefined, { type: "@@INIT" });
    expect(initialState).to.deep.equal({ items: {} });
  });

  describe("adding an item", () => {
    it("should add the provided item", () => {
      const initialState = { items: {} };
      const newItem = {
        id: "49b6c1cd-25e2-4d84-b37d-768fccd59b24",
        title: "Acheter du beurre de cacahuète",
        completed: false,
      };
      const newState = reducer(initialState, addItem(newItem));
      expect(newState).to.deep.equal({
        items: {
          "49b6c1cd-25e2-4d84-b37d-768fccd59b24": {
            id: "49b6c1cd-25e2-4d84-b37d-768fccd59b24",
            title: "Acheter du beurre de cacahuète",
            completed: false,
          },
        },
      });
    });

    it("should not change the initial state", () => {
      const initialState = { items: {} };
      const newItem = {
        id: "49b6c1cd-25e2-4d84-b37d-768fccd59b24",
        title: "Acheter du beurre de cacahuète",
        completed: false,
      };
      reducer(initialState, addItem(newItem));
      expect(initialState).to.deep.equal({ items: {} });
    });
  });

  describe("toggling an item completed test", () => {
    it("should change the item state from not completed to completed", () => {
      const initialState = {
        items: {
          "49b6c1cd-25e2-4d84-b37d-768fccd59b24": {
            id: "49b6c1cd-25e2-4d84-b37d-768fccd59b24",
            title: "Acheter du beurre de cacahuète",
            completed: false,
          },
        },
      };
      const newState = reducer(
        initialState,
        toggleItem("49b6c1cd-25e2-4d84-b37d-768fccd59b24")
      );
      expect(newState).to.deep.equal({
        items: {
          "49b6c1cd-25e2-4d84-b37d-768fccd59b24": {
            id: "49b6c1cd-25e2-4d84-b37d-768fccd59b24",
            title: "Acheter du beurre de cacahuète",
            completed: true,
          },
        },
      });
    });

    it("should change the item state from completed to not completed", () => {
      const initialState = {
        items: {
          "49b6c1cd-25e2-4d84-b37d-768fccd59b24": {
            id: "49b6c1cd-25e2-4d84-b37d-768fccd59b24",
            title: "Acheter du beurre de cacahuète",
            completed: true,
          },
        },
      };
      const newState = reducer(
        initialState,
        toggleItem("49b6c1cd-25e2-4d84-b37d-768fccd59b24")
      );
      expect(newState).to.deep.equal({
        items: {
          "49b6c1cd-25e2-4d84-b37d-768fccd59b24": {
            id: "49b6c1cd-25e2-4d84-b37d-768fccd59b24",
            title: "Acheter du beurre de cacahuète",
            completed: false,
          },
        },
      });
    });

    it("should do nothing if provided ID does not point to any item", () => {
      const initialState = {
        items: {
          "49b6c1cd-25e2-4d84-b37d-768fccd59b24": {
            id: "49b6c1cd-25e2-4d84-b37d-768fccd59b24",
            title: "Acheter du beurre de cacahuète",
            completed: true,
          },
        },
      };
      const newState = reducer(initialState, toggleItem("unknown-id"));
      expect(newState).to.deep.equal(initialState);
    });

    it("should not change the initial state", () => {
      const initialState = {
        items: {
          "49b6c1cd-25e2-4d84-b37d-768fccd59b24": {
            id: "49b6c1cd-25e2-4d84-b37d-768fccd59b24",
            title: "Acheter du beurre de cacahuète",
            completed: true,
          },
        },
      };
      reducer(initialState, toggleItem("49b6c1cd-25e2-4d84-b37d-768fccd59b24"));
      expect(initialState).to.deep.equal({
        items: {
          "49b6c1cd-25e2-4d84-b37d-768fccd59b24": {
            id: "49b6c1cd-25e2-4d84-b37d-768fccd59b24",
            title: "Acheter du beurre de cacahuète",
            completed: true,
          },
        },
      });
    });
  });

  describe("removing an item", () => {
    it("should remove the item with the provided ID", () => {
      const initialState = {
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
      const newState = reducer(
        initialState,
        removeItem("49b6c1cd-25e2-4d84-b37d-768fccd59b24")
      );
      expect(newState).to.deep.equal({
        items: {
          "b9929567-1cb7-4b35-9c4d-bae2b8ee625c": {
            id: "b9929567-1cb7-4b35-9c4d-bae2b8ee625c",
            title: "Trouver du bon café",
            completed: false,
          },
        },
      });
    });

    it("should not change the initial state", () => {
      const initialState = {
        items: {
          "49b6c1cd-25e2-4d84-b37d-768fccd59b24": {
            id: "49b6c1cd-25e2-4d84-b37d-768fccd59b24",
            title: "Acheter du beurre de cacahuète",
            completed: true,
          },
        },
      };
      reducer(initialState, removeItem("49b6c1cd-25e2-4d84-b37d-768fccd59b24"));
      expect(initialState).to.deep.equal({
        items: {
          "49b6c1cd-25e2-4d84-b37d-768fccd59b24": {
            id: "49b6c1cd-25e2-4d84-b37d-768fccd59b24",
            title: "Acheter du beurre de cacahuète",
            completed: true,
          },
        },
      });
    });
  });
});
