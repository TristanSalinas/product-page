import { Product } from "../../types/product";
import { ProductCard } from "../product_card/product_card";
import "./product_grid.css";

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section className="product-grid">
      <h1>Desserts</h1>
      <div className="product-grid__content">
        {products.map((product: Product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </section>
  );
}
