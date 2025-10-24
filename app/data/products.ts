export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

// Fetch products from dummyjson and map them to our Product interface
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  return data.products.map((p: any) => ({
    id: p.id,
    name: p.title,
    description: `Rating: ${p.rating}`,
    price: p.price,
    image: p.thumbnail,
    category: p.category
  }));
}

// Local cache for products
let productsCache: Product[] | null = null;

// Get products (with caching)
export async function getProducts(): Promise<Product[]> {
  if (!productsCache) {
    productsCache = await fetchProducts();
  }
  return productsCache;
}

// Get single product by id
export async function getProductById(id: number): Promise<Product | undefined> {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok) return undefined;
    
    const p = await res.json();
    return {
      id: p.id,
      name: p.title,
      description: `Rating: ${p.rating}`,
      price: p.price,
      image: p.thumbnail,
      category: p.category
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return undefined;
  }
}


