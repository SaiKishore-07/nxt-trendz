import React from "react";

// Step 1: Creating the context object with default values
const CartContext = React.createContext({
  cartList: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
});

// Step 2: Exporting the context object so it can be used in other components
export default CartContext;
