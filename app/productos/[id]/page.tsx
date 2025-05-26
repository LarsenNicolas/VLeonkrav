
import ProductClientDetailPage from "./product-client-page";
import {getProductById, getProducts} from "@/actions/products/actions";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)
  const products = await getProducts()

  return <ProductClientDetailPage initialProducts={product} products={products} />
}
