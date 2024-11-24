import { Product } from "../../types/products";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
interface ProductCardProps {
  product: Product; // Expecting a Product object
}

export function ProductCard({ product }: ProductCardProps) {
  const cart = useCart();
  const [countInCart, setCountInCart] = useState<number>(0);

  return (
    <article className="product-card">
      <p>{product.name}</p>
      {countInCart <= 0 ? (
        <button
          className="product-card-btn product-card-btn--add"
          onClick={useCart().addToCart}
        >
          ADD TO CART
        </button>
      ) : (
        <div className="product-card-btn product-card-btn--plus-minus">
          <button className="product-card-btn__minus" onClick={handleMinus}>
            -
          </button>
          <p>{countInCart}</p>
          <button className="product-card-btn__plus" onClick={handlePlus}>
            +
          </button>
        </div>
      )}
    </article>
  );
}
