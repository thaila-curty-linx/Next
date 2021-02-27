import React, { useState } from "react";
import { useRouter } from "next/router";
import { Document } from "prismic-javascript/types/documents";
import { client } from "@/lib/prismic";
import PrismicDom from "prismic-dom";
import { GetStaticPaths, GetStaticProps } from "next";

interface ProducProps {
  product: Document;
}

export default function products({ product }: ProducProps) {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Carregando....</p>;
  }

  return (
    <div>
      <h1> {PrismicDom.RichText.asText(product.data.title)}</h1>
      <img src={product.data.thumbnail.url} width="300" alt="" />
      <div
        dangerouslySetInnerHTML={{
          __html: PrismicDom.RichText.asHtml(product.data.description),
        }}
      ></div>
      <p>Price: ${product.data.price}</p>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProducProps> = async (context) => {
  const { slug } = context.params;

  const product = await client().getByUID("product", String(slug), {});

  return {
    props: {
      product,
    },
    revalidate: 10,
  };
};
