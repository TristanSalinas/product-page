import "./product_page.css";
import products from "../data.json";

import { CartProvider } from "../context/cart_context";
import { ProductGrid } from "../components/product_grid/product_grid";
import { Cart } from "../components/shopping_cart/shopping_cart";

export function ProductPage() {
  return (
    <main className="main">
      <CartProvider>
        <ProductGrid products={products} />
        <Cart />
      </CartProvider>
    </main>
  );
}
