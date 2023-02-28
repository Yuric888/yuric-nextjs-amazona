import { formatedCurrency } from "@/constant/formatedCurrency";
import { ProductType } from "@/types/Product.type";
import { CartActionType, useProductContext } from "@/utils/StoreContext";
import Link from "next/link";

type Props = { product: ProductType };

const ProductItem = ({ product }: Props) => {
  const { state, dispatch } = useProductContext();
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
  };
  return (
    <div className="card">
      <Link href={`product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow"
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`product/${product.slug}`}>
          <h2 className="text-lg">{product.name}</h2>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>{formatedCurrency(product.price)}</p>
        <button
          onClick={addToCartHandler}
          className="primary-button"
          type="button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
