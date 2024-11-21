import { Product } from "../../types/products";

interface ProductCardProps {
  product: Product;  // Expecting a Product object
}

export function ProductCard({product} : ProductCardProps){
  return (
    <p>{product.name}</p>
  );
}