import { useReducer } from "react";

import CartContext from "./cart_context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (preState, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      preState.totalAmount + action.item.price * action.item.amount;

    let updatedItems;

    const existingCartItemIndex = preState.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = preState.items[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...preState.items[existingCartItemIndex],
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...preState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = preState.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === "REMOVE") {
    const existingCartItemIndex = preState.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = preState.items[existingCartItemIndex];
    const updatedTotalAmount = +(preState.totalAmount - existingCartItem.price);

    let updatedItems;

    if (existingCartItem.amount > 1) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };

      updatedItems = [...preState.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = preState.items.filter((item) => {
        return item.id !== action.id;
      });
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  if (action.type === "CLEAR") {
    return defaultCartState;
  }

  return defaultCartState;
};

const CardProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemFromHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CardProvider;
