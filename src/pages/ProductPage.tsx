import "./ProductPage.css";
import products from "../data.json";

import { ProductGrid } from "../components/ProductGrid/ProductGrid";

export function ProductPage(){
  return(
    <>
    <main className="main">
      <ProductGrid products={ products} />
    </main>
    </>
  )
}