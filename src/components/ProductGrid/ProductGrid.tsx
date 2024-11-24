import { ProductList } from "../../types/products";
import { Product } from "../../types/products";
import { ProductCard } from "../ProductCard/ProductCard";

export function ProductGrid({ products }: ProductList) {
  return (
    <div className="product-grid">
      {products.map((_product: Product) => {
        return <ProductCard key={_product.id} product={_product} />;
      })}
    </div>
  );
}
