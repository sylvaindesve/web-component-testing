import {
  ADD_ITEM,
  REMOVE_ITEM,
  REPLACE_ITEMS,
  TOGGLE_ITEM,
} from "./actions.mjs";

/**
 * @typedef TodoItem
 * @type {Object}
 * @property {string} id - Identifiant unique
 * @property {string} title - Titre de l'item
 * @property {boolean} completed - Indique si l'item est fait
 */

/**
 * @typedef TodoState
 * @type {Object}
 * @property {Object.<string, TodoItem>} items
 */

/**
 * @type {TodoState}
 */
const initialState = {
  items: {},
};

/**
 *
 * @type {import("./StateStore.mjs").Reducer<TodoState>}
 */
function reducer(state = initialState, action) {
  if (action.type === ADD_ITEM) {
    /** @type {TodoItem} */
    const newItem = action.payload;
    return { ...state, items: { ...state.items, [newItem.id]: newItem } };
  }

  if (action.type === TOGGLE_ITEM) {
    const itemId = action.payload;
    if (itemId in state.items) {
      return {
        ...state,
        items: {
          ...state.items,
          [itemId]: {
            ...state.items[itemId],
            completed: !state.items[itemId].completed,
          },
        },
      };
    }
  }

  if (action.type === REMOVE_ITEM) {
    const itemId = action.payload;
    if (itemId in state.items) {
      const { [itemId]: removedItem, ...otherItems } = state.items;
      return {
        ...state,
        items: otherItems,
      };
    }
  }

  if (action.type === REPLACE_ITEMS) {
    const items = action.payload;
    return {
      ...state,
      items: items.reduce((itemsById, item) => {
        return {
          ...itemsById,
          [item["id"]]: item,
        };
      }, {}),
    };
  }

  return state;
}

export default reducer;
