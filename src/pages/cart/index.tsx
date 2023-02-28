import Layout from "@/components/Layout";
import { formatedCurrency } from "@/constant/formatedCurrency";
import { CartActionType, useProductContext } from "@/utils/StoreContext";
import Image from "next/image";
import Link from "next/link";
import { XCircleIcon } from "@heroicons/react/outline";
import { CartItem } from "@/types/Product.type";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
type Props = {};

const CartScreen = (props: Props) => {
  const { state, dispatch } = useProductContext();
  const router = useRouter();
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item: CartItem) => {
    dispatch({ type: CartActionType.CART_REMOVE_ITEM, payload: item });
  };
  const updateCartHandler = (item: CartItem, qty: any) => {
    const quantity = Number(qty);
    dispatch({
      type: CartActionType.CART_ADD_ITEM,
      payload: { ...item, quantity },
    });
  };
  return (
    <Layout title="Shopping Cart">
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="px-5 text-right">Quantity</th>
                  <th className="px-5 text-right">Price</th>
                  <th className="px-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link
                        href={`product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded-sm"
                        />
                        &nbsp;
                        {item.name}
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">
                      {formatedCurrency(item.price)}
                    </td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-5 w-5"></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3">
                  Subtotal (
                  {cartItems.reduce((a, c) => {
                    return a + c.quantity;
                  }, 0)}
                  ) :{"   "}
                  {formatedCurrency(
                    cartItems.reduce((a, c) => {
                      return a + c.quantity * c.price;
                    }, 0)
                  )}
                </div>
              </li>
              <li>
                <button
                  onClick={() => router.push("/shipping")}
                  className="w-full primary-button"
                >
                  Check Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
