"use client";  // Make sure this is added at the top of your file

import React, { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { Product } from "../../../../types/products";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/router";  // Use useRouter hook

interface ProductPageProps {
  product: Product | null;
}

const getProduct = async (slug: string): Promise<Product | null> => {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
      _id,
      name,
      _type,
      image,
      price,
      description
    }`,
    { slug }
  );
};

const ProductPage = ({ product }: ProductPageProps) => {
  const router = useRouter();  // Use useRouter hook
  const { slug } = router.query;  // Get slug from the URL query params

  const [productData, setProductData] = useState<Product | null>(product);

  // Ensure that slug is a string and hooks are always called unconditionally
  useEffect(() => {
    if (slug && !productData) {
      const fetchProduct = async () => {
        const data = await getProduct(slug as string);  // Ensure slug is used as string
        setProductData(data);
      };
      fetchProduct();
    }
  }, [slug, productData]);  // This ensures that the effect runs when either the slug or productData changes

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square">
          {productData.image && (
            <Image
              src={urlFor(productData.image).url()}
              alt={productData.name}
              width={400}
              height={400}
              className="rounded-lg shadow-md"
            />
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl font-bold">{productData.name}</h1>
          <p className="text-2xl font-sans">${productData.price}</p>
          <p className="text-lg font-sans">{productData.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
