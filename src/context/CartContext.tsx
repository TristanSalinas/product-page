import React, { createContext, useState, useContext, ReactNode } from "react";
import { Product } from "../types/products";

export interface CartItem extends Product {
  quantity: number;
}

const CartContext = createContext<
  | {
      cartProducts: Array<CartItem>;
      setCartProducts: React.Dispatch<Array<CartItem>>;
    }
  | undefined
>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartProducts, setCartProducts] = useState<Array<CartItem>>([]);
  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

interface UseCartReturn {
  cartProducts: Array<CartItem>;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  updateQuantity: (product: Product, operation: "ADD" | "REMOVE") => void;
  countInCart: number;
}

export function useCart(): UseCartReturn {
  const { cartProducts, setCartProducts } = useCartContext();

  const addToCart = (product: Product) => {
    setCartProducts([...cartProducts, { ...product, quantity: 1 }]);
  };

  const removeFromCart = (product: Product) => {
    setCartProducts(
      cartProducts.filter((cartProduct) => cartProduct.id !== product.id)
    );
  };

  const updateQuantity = (product: Product, operation: "ADD" | "REMOVE") => {
    const productInCart = cartProducts.find(
      (cartProduct) => cartProduct.id === product.id
    );
    switch (operation) {
      case "ADD":
        if (productInCart) {
          setCartProducts(
            cartProducts.map((cartProduct: CartItem) =>
              cartProduct.id === product.id
                ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
                : cartProduct
            )
          );
        } else {
          addToCart(product);
        }
        break;
      case "REMOVE":
        setCartProducts(
          cartProducts
            .map((cartProduct: CartItem) =>
              cartProduct.id === product.id
                ? { ...cartProduct, quantity: cartProduct.quantity - 1 }
                : cartProduct
            )
            .filter((cartProduct) => cartProduct.quantity <= 0)
        );
        break;
    }
  };

  const countInCart = cartProducts.length;
  return {
    cartProducts: cartProducts,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    updateQuantity: updateQuantity,
    countInCart,
  };
}

/*export type CartAction =
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

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
*/
