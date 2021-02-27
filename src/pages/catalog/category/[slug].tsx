import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";

interface ICategory {
  id: string;
  title: string;
}

interface IProduct {
  id: string;
  title: string;
}

interface CategoryProps {
  products: IProduct[];
}
export default function Category({ products }: CategoryProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando....</p>;
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: "camisetas" } }, { params: { slug: "calcas" } }],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CategoryProps> = async (
  context
) => {
  const { slug } = context.params;
  const response = await fetch(
    `http://localhost:3334/products?category_id=${slug}`
  );
  const products = await response.json();

  return {
    props: {
      products,
    },
    revalidate: 60,
  };
};
