import { ProductList } from "../../types/products";
import { Product } from "../../types/products";
import { ProductCard } from "../ProductCard/ProductCard";
import "./ProductGrid.css";

export function ProductGrid({ products }: ProductList) {
  return (
    <section className="product-grid">
      <h1>Desserts</h1>
      <div className="product-grid__content">
        {products.map((_product: Product) => {
          return <ProductCard key={_product.id} product={_product} />;
        })}
      </div>
    </section>
  );
}
