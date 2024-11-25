import { Product } from "../../types/product";
import { useCart } from "../../hooks/use_cart";
import "./product_card.css";
interface ProductCardProps {
  product: Product; // Expecting a Product object
}

export function ProductCard({ product }: ProductCardProps) {
  const cart = useCart();
  const countInCart = cart.countInCartOf(product);

  return (
    <article className="product-card">
      <div className="product-card__top">
        <img
          className={
            countInCart <= 0
              ? "product-card__img"
              : "product-card__img product-card__img--active"
          }
          src={product.image.desktop}
        />
        {countInCart <= 0 ? (
          <button
            className="product-card-btn product-card-btn--add"
            onClick={() => {
              cart.addToCart(product);
            }}
          >
            <img src="./assets/images/icon-add-to-cart.svg" />
            <p>Add To Cart</p>
          </button>
        ) : (
          <div className="product-card-btn product-card-btn--plus-minus">
            <button
              className="product-card-btn__minus"
              onClick={() => {
                cart.updateQuantity(product, "REMOVE");
              }}
            >
              <img src="./assets/images/icon-decrement-quantity.svg" />
            </button>
            <p>{countInCart}</p>
            <button
              className="product-card-btn__plus"
              onClick={() => {
                cart.updateQuantity(product, "ADD");
              }}
            >
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
