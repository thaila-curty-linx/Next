import { useEffect, useState } from "react";
import { Title } from "../styles/Pages/home";

interface IProduct {
  id: string;
  title: string;
}

export default function Home() {
  const [recommendedProducts, setRecommentedProducts] = useState<IProduct[]>(
    []
  );

  useEffect(() => {
    fetch("http://localhost:3334/recommended").then((response) => {
      response.json().then((data) => {
        setRecommentedProducts(data);
      });
    });
  }, []);

  return (
    <div>
      <Title>Hello World</Title>
      <section>
        <Title>Products</Title>
        <ul>
          {recommendedProducts.map((recommendedProduct) => (
            <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
