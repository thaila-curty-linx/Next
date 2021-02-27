import React, { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const AddToCartModal = dynamic(
  () => import("../../../components/AddToCartModal"),
  { loading: () => <p>Loading...</p> }
);

const products: React.FC = () => {
  const router = useRouter();
  const [isAddToCartModalVisiblem, setIsAddToCartModalVisiblem] = useState(
    false
  );
  function handleAddToCart() {
    setIsAddToCartModalVisiblem(true);
  }
  return (
    <div>
      <h1>{router.query.slug}</h1>
      <button onClick={handleAddToCart}>Add to Cart</button>
      {isAddToCartModalVisiblem && <AddToCartModal />}
    </div>
  );
};

export default products;
