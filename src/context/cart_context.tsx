import React, { createContext, useState, ReactNode } from "react";
import { Product } from "../types/product";

interface CartItem extends Product {
  quantity: number;
}

export const CartContext = createContext<
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
