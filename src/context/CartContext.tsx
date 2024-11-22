import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { Product } from "../types/products";
//import { ProductCard } from "../components/ProductCard/ProductCard";

export type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } };

interface CartItem extends Product {
  quantity: number;
}

interface CartProductList {
  cartItems: CartItem[];
}

const initialState: CartProductList = {
  cartItems: [],
};

const cartReducer = (
  state: CartProductList,
  action: CartAction
): CartProductList => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        ),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((cartItem) =>
          cartItem.id === action.payload.id
            ? { ...cartItem, quantity: action.payload.quantity }
            : cartItem
        ),
      };
    default:
      return state;
  }
};

const CartContext = createContext<
  | {
      state: CartProductList;
      dispatch: React.Dispatch<CartAction>;
    }
  | undefined
>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
