import { GetServerSideProps } from "next";
import { Title } from "../styles/Pages/home";

interface IProduct {
  id: string;
  title: string;
}

interface HomeProps {
  recommendedProducts: IProduct[];
}

export default function Home({ recommendedProducts }: HomeProps) {
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch("http://localhost:3334/recommended");
  const recommendedProducts = await response.json();

  return {
    props: { recommendedProducts },
  };
};
