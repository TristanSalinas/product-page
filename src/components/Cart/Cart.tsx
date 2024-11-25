import { useCart } from "../../context/CartContext";

export function Cart() {
  const carts = useCart();
  return (
    <div className="cart">
      <h2>Your Cart :P</h2>
      {carts.cartProducts.map((cartItem) => (
        <p key={cartItem.id}>
          {cartItem.name} : {cartItem.quantity}
        </p>
      ))}
    </div>
  );
}
