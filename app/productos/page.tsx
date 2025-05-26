import {getProducts} from "@/actions/products/actions";
import ProductsClientPage from "@/app/productos/products-client";

export default async function ProductsPage() {
  const products = await getProducts()
  return <ProductsClientPage initialProducts={products} />
}
