import { useCart } from "../../hooks/use_cart";
import "./cart.css";

export function Cart() {
  const cart = useCart();
  return (
    <section className="cart">
      <h2>Your Cart ({cart.countInCart})</h2>
      {cart.cartProducts.map((cartItem) => (
        <article className="cart__article">
          <div className="cart__article__left">
            <h3 key={cartItem.id}>{cartItem.name}</h3>
            <div className="cart__article-detail-container">
              <p className="cart__article-detail--quantity">
                {cartItem.quantity}x
              </p>
              <p className="cart__article-detail--price">
                @ ${cartItem.price.toFixed(2)}
              </p>
              <p className="cart__article-detail--price-total">
                ${(cartItem.quantity * cartItem.price).toFixed(2)}
              </p>
            </div>
          </div>
          <button
            className="cart__article__right"
            onClick={() => {
              cart.removeFromCart(cartItem);
            }}
          >
            <img src="./assets/images/icon-remove-item.svg" alt="" />
          </button>
        </article>
      ))}
      <div className="cart__order-total">
        <p>Order Total</p>
        <p className="cart__total-price">${cart.totalPrice.toFixed(2)}</p>
      </div>
      <div className="delivery-infos">
        <img src="./assets/images/icon-carbon-neutral.svg" />
        <p>
          This is a <span>carbon neutral</span> delivery
        </p>
      </div>
      <button className="confirm-btn">Confirm Order</button>
    </section>
  );
}
