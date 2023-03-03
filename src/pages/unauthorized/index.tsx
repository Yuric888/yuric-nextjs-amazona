import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

const Unauthorized = (props: Props) => {
  const router = useRouter();
  const { message } = router.query;
  return (
    <Layout title="Unauthorized Page">
      <p>Access Denied</p>
      {message && <div className="text-xl text-red-500">{message}</div>}
    </Layout>
  );
};

export default Unauthorized;
