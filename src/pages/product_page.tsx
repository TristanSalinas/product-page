import "./ProductPage.css";
import products from "../data.json";

import { CartProvider } from "../context/cart_context";
import { ProductGrid } from "../components/product_grid/product_grid";
import { Cart } from "../components/cart/cart.tsx";

export function ProductPage() {
  return (
    <>
      <main className="main">
        <CartProvider>
          <ProductGrid products={products} />
          <Cart />
        </CartProvider>
      </main>
    </>
  );
}
