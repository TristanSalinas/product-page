import "./ProductPage.css";
import products from "../data.json";

import { CartProvider } from "../context/CartContext";
import { ProductGrid } from "../components/ProductGrid/ProductGrid";
import { Cart } from "../components/Cart/Cart";

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
