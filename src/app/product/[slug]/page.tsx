import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { Product } from "../../../../types/products";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

// Define the type for the props to be passed to the component
interface ProductPageProps {
  product: Product | null;
}

// Fetch product data based on the slug
async function getProduct(slug: string): Promise<Product | null> {
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
}

// Static generation: Define paths for dynamic routes
export async function getStaticPaths() {
  const products = await client.fetch(groq`*[_type == "product"]{slug}`);
  const paths = products.map((product: { slug: { current: string } }) => ({
    params: { slug: product.slug.current },
  }));

  return {
    paths,
    fallback: false, // If a product is not found, show 404
  };
}

// Static generation: Fetch product data for each page
export async function getStaticProps({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  return {
    props: {
      product,
    },
  };
}

export default function ProductPage({ product }: ProductPageProps) {
  if (!product) {
    return <div className="text-center text-2xl font-bold">Product not found</div>;
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
}
