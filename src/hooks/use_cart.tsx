import { Product } from "../types/product";
import { CartContext } from "../context/cart_context";
import { useContext } from "react";

interface CartItem extends Product {
  quantity: number;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart is called yet no cartContext is found");
  }
  const { cartProducts, setCartProducts } = context;

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
        if (productInCart !== undefined) {
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
            .filter((cartProduct) => cartProduct.quantity > 0)
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

  const countInCart = cartProducts.reduce(
    (acc, cartProduct) => acc + cartProduct.quantity,
    0
  );

  const totalPrice = cartProducts.reduce((acc, cartProduct) => {
    return acc + cartProduct.quantity * cartProduct.price;
  }, 0);

  return {
    cartProducts,
    addToCart,
    removeFromCart,
    updateQuantity,
    countInCartOf,
    countInCart,
    totalPrice,
  };
}
