import Layout from "@/components/Layout";
import { formatedCurrency } from "@/constant/formatedCurrency";
import { data } from "@/utils/data";
import { CartActionType, Store, useProductContext } from "@/utils/StoreContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {};

const ProductScreen = (props: Props) => {
  const { query } = useRouter();
  const router = useRouter();
  const { slug } = query;
  const product = data.products.find((p) => p.slug === slug);
  const { state, dispatch } = useProductContext();
  if (!product) {
    return <div>Product Not Found</div>;
  }
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      alert("Sorry. Product is out of Stock");
      return;
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
