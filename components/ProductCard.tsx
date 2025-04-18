import Image from "next/image";

interface Product {
  id: string; // ✅ id is string now
  title: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <div className="border rounded-lg shadow-md hover:shadow-xl transition p-4 flex flex-col items-center">
      <div className="w-full h-48 overflow-hidden rounded">
        <Image
          src={product.image}
          alt={product.title}
          width={300}
          height={300}
          className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          unoptimized
        />
      </div>
      <h3 className="text-center text-lg font-semibold mt-3">{product.title}</h3>
      <p className="text-center text-gray-700 mb-2">${product.price}</p>

      <div className="flex items-center mb-2">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className="text-yellow-400">★</span>
        ))}
      </div>

      <button
        onClick={() => addToCart({ ...product, quantity: 1 })}
        className="mt-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
      >
        Add to Cart 🛒
      </button>
    </div>
  );
}
