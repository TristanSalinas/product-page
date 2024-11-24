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
  countInCartOf: (product: Product) => number;
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

  const countInCartOf = (product: Product) => {
    const cartProduct = cartProducts.find(
      (cartProduct) => cartProduct.id === product.id
    );
    return cartProduct ? cartProduct.quantity : 0;
  };

  const countInCart = cartProducts.length;
  return {
    cartProducts,
    addToCart,
    removeFromCart,
    updateQuantity,
    countInCartOf,
    countInCart,
  };
}
