import "./ProductPage.css";
import products from "../data.json";

import { ProductGrid } from "../components/ProductGrid/ProductGrid";
import { Cart } from "../components/Cart/Cart";

export function ProductPage() {
  return (
    <>
      <main className="main">
        <ProductGrid products={products} />
        <Cart />
      </main>
    </>
  );
}
