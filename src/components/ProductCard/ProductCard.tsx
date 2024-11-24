import { Product } from "../../types/products";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
interface ProductCardProps {
  product: Product; // Expecting a Product object
}

export function ProductCard({ product }: ProductCardProps) {
  const { state, dispatch } = useCart();
  const [countInCart, setCountInCart] = useState<number>(0);

  const handleAddToCart = () => {
    setCountInCart(1);
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  const handlePlus = () => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: product.id, quantity: countInCart + 1 },
    });
    setCountInCart((prevCount) => prevCount + 1);
  };

  const handleMinus = () => {
    if (countInCart > 1) {
      setCountInCart((prevCount) => prevCount - 1);
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id: product.id, quantity: countInCart - 1 },
      });
    } else {
      setCountInCart(0);
      dispatch({ type: "REMOVE_ITEM", payload: product });
    }
  };

  return (
    <article className="product-card">
      <p>{product.name}</p>
      {countInCart <= 0 ? (
        <button
          className="product-card-btn product-card-btn--add"
          onClick={handleAddToCart}
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
