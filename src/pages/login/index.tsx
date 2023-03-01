import Layout from "@/components/Layout";
import Link from "next/link";
import { useForm } from "react-hook-form";
type Props = {};
type FormValues = {
  email: string;
  password: string;
};

const LoginScreen = (props: Props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>();
  const submitHandler = ({ email, password }: FormValues) => {};
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
