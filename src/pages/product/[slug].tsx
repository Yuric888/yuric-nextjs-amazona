import Layout from "@/components/Layout";
import { formatedCurrency } from "@/constant/formatedCurrency";
import Product from "@/models/Product";
import { CartItem } from "@/types/Product.type";
import { connectDB } from "@/utils/connectDB";
import { CartActionType, Store, useProductContext } from "@/utils/StoreContext";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
type ProductApi = {
  _id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  numberReviews: number;
  countInStock: number;
  description: string;
};
type Props = {
  product: CartItem;
};

const ProductScreen = ({ product }: Props) => {
  const router = useRouter();
  const { state, dispatch } = useProductContext();
  if (!product) {
    return (
      <Layout title="Product Not Found">
        <p>Product Not Found</p>
      </Layout>
    );
  }
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({
      type: CartActionType.CART_ADD_ITEM,
      payload: { ...product, quantity },
    });
    router.push("/cart");
  };
  return (
    <Layout title={product.name}>
      <div className="mb-3">
        <Link href="/">Back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2 ">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            className="rounded-md"
          />
        </div>
        <div>
          <ul className="font-medium">
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numberReviews} reviews
            </li>
            <li>Description: {product.description}</li>
          </ul>
        </div>
        <div className="card p-5 h-[150px]">
          <div className="mb-2 flex justify-between">
            <p>Price</p>
            <p>{formatedCurrency(product.price)}</p>
          </div>
          <div className="mb-2 flex justify-between">
            <p>Status</p>
            <p>{product.countInStock > 0 ? "In Stock" : "Unavailable"}</p>
          </div>
          <button className="primary-button w-full" onClick={addToCartHandler}>
            Add to Cart
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductScreen;

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await connectDB();
  const product: ProductApi = await Product.findOne({ slug }).lean();

  return {
    props: {
      product: product ? convertDocToObj(product) : null,
    },
  };
}

function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  // doc.createAt = doc.createAt.toString();
  // doc.updatedAt = doc.updatedAt.toString();
  return doc;
}
