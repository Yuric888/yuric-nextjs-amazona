import { useProductContext } from "@/utils/StoreContext";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type Props = {
  children: React.ReactElement | React.ReactElement[];
  title: string;
};

const Layout = ({ children, title }: Props) => {
  const { status, data: session } = useSession();

  const { state } = useProductContext();
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState<number>(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return (
    <>
      <Head>
        <title>{title ? title + " - Amazona" : "Amazona"}</title>
        <meta name="description" content="Ecommerce Website" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 justify-between items-center shadow-md px-4">
            <Link href="/">
              <p className="text-lg font-bold">amazona</p>
            </Link>
            <div>
              <Link href="/cart" className="p-2">
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 text-xs font-bold bg-red-600 rounded-full px-2 py-1 text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                session.user.name
              ) : (
                <Link href="/login">Login</Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner mt-3">
          <p>Copyright &#169; 2023 Amazona</p>
        </footer>
      </div>
    </>
  );
};

export default Layout;
