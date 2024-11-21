import { ProductList } from "../../types/products"
import { Product } from "../../types/products"
import { ProductCard } from "../ProductCard/ProductCard"

export function ProductGrid({products }: ProductList ){
  return(
    <div className="product-grid">
      {products.map((_product : Product)=>{
        return <ProductCard product= {_product} />
      })}
    </div>
  )
}