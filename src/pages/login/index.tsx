import Layout from "@/components/Layout";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { getError } from "@/utils/getError";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/router";
type Props = {};
type FormValues = {
  email: string;
  password: string;
};

const LoginScreen = (props: Props) => {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();
  const submitHandler = async ({ email, password }: FormValues) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Layout title="login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="w-full"
            id="email"
            autoFocus
            {...register("email", {
              required: "Please enter email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter valid email",
              },
            })}
          />
          {errors.email && (
            <div className="text-red-500">
              {errors.email.message?.toString()}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="w-full"
            id="password"
            autoFocus
            {...register("password", {
              required: "Please enter password",
              minLength: {
                value: 6,
                message: "Password is more than 5 chars",
              },
            })}
          />
          {errors.password && (
            <div className="text-red-500">
              {errors.password.message?.toString()}
            </div>
          )}
        </div>
        <button className="primary-button mb-4">Login</button>
        <div className="mb-4">
          Don&apos;t have an account? &nbsp;
          <Link href="/register">Register</Link>
        </div>
      </form>
    </Layout>
  );
};

export default LoginScreen;
