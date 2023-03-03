import Layout from "@/components/Layout";
import ProductItem from "@/components/ProductItem";
import { connectDB } from "@/utils/connectDB";
import Product from "@/models/Product";
import { ProductType } from "@/types/Product.type";
import { useRouter } from "next/router";
import { CartActionType, useProductContext } from "@/utils/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

type HomePage = {
  products: ProductType[];
};

export default function Home({ products }: HomePage) {
  const { state, dispatch } = useProductContext();

  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`api/products/${product._id}`);

    if (data.countInStock < quantity) {
      alert("Sorry. Product is out of Stock");
      return;
    }
    dispatch({
      type: CartActionType.CART_ADD_ITEM,
      payload: { ...product, quantity },
    });
    toast.success("Product added to the cart");
  };
  return (
    <Layout title="Home Page">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-3">
        {products.map((product) => (
          <ProductItem
            addToCartHandler={addToCartHandler}
            product={product}
            key={product.slug}
          />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await connectDB();

  const products: ProductType[] = await Product.find().lean();

  return {
    props: {
      products: products.map(convertDocToObj),
    },
  };
}

function convertDocToObj(doc) {
  doc._id = doc._id.toString();
  // doc.createAt = doc.createAt.toString();
  // doc.updatedAt = doc.updatedAt.toString();
  return doc;
}
