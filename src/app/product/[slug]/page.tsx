// src/app/product/[slug]/page.tsx

import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { Product } from "../../../../types/products";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface ProductPageProps {
  params: {
    slug: string;
  };
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

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = params;
  const product = await getProduct(slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="aspect-square">
          {product.image && (
            <Image
              src={urlFor(product.image).url()}
              alt={product.name}
              width={400}
              height={400}
              className="rounded-lg shadow-md"
            />
          )}
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-8">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl font-sans">${product.price}</p>
          <p className="text-lg font-sans">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
