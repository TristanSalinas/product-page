import { Product } from "../../types/products";
import { useCart } from "../../context/CartContext";
import { useEffect } from "react";
interface ProductCardProps {
  product: Product; // Expecting a Product object
}

export function ProductCard({ product }: ProductCardProps) {
  const { state, dispatch } = useCart();

  const handleCick = () => {
    dispatch({ type: "ADD_ITEM", payload: product });
    useEffect(() => {
      console.log("Updated State:", state);
    }, [state]);
  };

  return (
    <article className="product-card">
      <p>{product.name}</p>
      <button onClick={handleCick}>ADD TO CART</button>
    </article>
  );
}
