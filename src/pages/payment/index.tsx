import CheckoutWizard from "@/components/CheckoutWizard";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CartActionType, useProductContext } from "@/utils/StoreContext";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
type Props = {};

const PaymentScreen = (props: Props) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");

  const { state, dispatch } = useProductContext();
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress.address]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (!selectedPaymentMethod) {
      return toast.error("Payment method is required");
    }
    dispatch({
      type: CartActionType.SAVE_PAYMENT_METHOD,
      payload: selectedPaymentMethod,
    });

    Cookies.set(
      "cartItems",
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );
    router.push("/placeorder");
  };
  const dataMethod = ["PayPal", "Stripe", "CashOnDelivery"];
  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {dataMethod.map((payment) => (
          <div className="mb-4" key={payment}>
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />
            <label className="p-2">{payment}</label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.push("/shipping")}
            type="button"
            className="default-button"
          >
            Back
          </button>
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
};

export default PaymentScreen;
