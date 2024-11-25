import { Product } from "../../types/products";
import { useCart } from "../../context/CartContext";
import "./ProductCard.css";
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
      <div className="product-card__top">
        <img
          className={
            cart.countInCartOf(product) <= 0
              ? "product-card__img"
              : "product-card__img product-card__img--active"
          }
          src={product.image.desktop}
        />
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
              <img src="./assets/images/icon-decrement-quantity.svg" />
            </button>
            <p>{cart.countInCartOf(product)}</p>
            <button className="product-card-btn__plus" onClick={handlePlus}>
              <img src="./assets/images/icon-increment-quantity.svg" />
            </button>
          </div>
        )}
      </div>
      <div className="product-card__bottom">
        <p className="product-card__category">{product.category}</p>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__price">${product.price.toFixed(2)}</p>
      </div>
    </article>
  );
}
