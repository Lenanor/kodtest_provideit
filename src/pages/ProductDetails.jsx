import { useLoaderData } from "react-router-dom";

import Product from "../components/Product";

export default function ProductDetailsPage() {
  const product = useLoaderData();

  return (
    <>
      <h1>Product Details </h1>
      <Product product={product} isDetail={true} />
    </>
  );
}
