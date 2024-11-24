import { Product } from "../../types/products";
import { useCart } from "../../context/CartContext";
//import { useState } from "react";
interface ProductCardProps {
  product: Product; // Expecting a Product object
}

export function ProductCard({ product }: ProductCardProps) {
  const cart = useCart();

  const handleAdd = () => {
    cart.addToCart(product);
  };
  const handleMinus = () => {
    cart.updateQuantity(product, "REMOVE");
  };
  const handlePlus = () => {
    cart.updateQuantity(product, "ADD");
  };

  return (
    <article className="product-card">
      <p>{product.name}</p>
      {cart.countInCartOf(product) <= 0 ? (
        <button
          className="product-card-btn product-card-btn--add"
          onClick={handleAdd}
        >
          ADD TO CART
        </button>
      ) : (
        <div className="product-card-btn product-card-btn--plus-minus">
          <button className="product-card-btn__minus" onClick={handleMinus}>
            -
          </button>
          <p>{cart.countInCartOf(product)}</p>
          <button className="product-card-btn__plus" onClick={handlePlus}>
            +
          </button>
        </div>
      )}
    </article>
  );
}
