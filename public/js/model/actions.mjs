export const ADD_ITEM = "ADD_ITEM";

/**
 * Créé une action d'ajout d'item à la liste.
 * @param {import("./reducer.mjs").TodoItem} newItem L'item à ajouter
 * @returns {import("./StateStore.mjs").Action<import("./reducer.mjs").TodoItem>}
 */
export function addItem(newItem) {
  return {
    type: ADD_ITEM,
    payload: newItem,
  };
}

export const TOGGLE_ITEM = "TOGGLE_ITEM";

/**
 * Créé une action pour basculer un item de terminé à non terminé ou l'inverse
 * @param {string} itemId L'ID de l'item à basculer
 * @returns {import("./StateStore.mjs").Action<string>}
 */
export function toggleItem(itemId) {
  return {
    type: TOGGLE_ITEM,
    payload: itemId,
  };
}

export const REMOVE_ITEM = "REMOVE_ITEM";

/**
 * Créé une action pour supprimer un item
 * @param {string} itemId L'ID de l'item à supprimer
 * @returns {import("./StateStore.mjs").Action<string>}
 */
export function removeItem(itemId) {
  return {
    type: REMOVE_ITEM,
    payload: itemId,
  };
}

export const REPLACE_ITEMS = "REPLACE_ITEMS";

/**
 * Créé une action pour remplacer la totalité des items
 * @param {import("./reducer.mjs").TodoItem[]} items
 * @returns {import("./StateStore.mjs").Action<import("./reducer.mjs").TodoItem[]>}
 */
export function replaceItems(items) {
  return {
    type: REPLACE_ITEMS,
    payload: items,
  };
}
