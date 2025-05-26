import ProductClient from "@/app/admin/productos/product-client";
import {getProducts} from "@/actions/products/actions";

export default async function ProductsPage() {
  const products = await getProducts()
  return <ProductClient initialProducts={products} />
}
