import { formatedCurrency } from "@/constant/formatedCurrency";
import { ProductType } from "@/types/Product.type";
import Link from "next/link";

type Props = { product: ProductType; addToCartHandler: Function };

const ProductItem = ({ product, addToCartHandler }: Props) => {
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
          onClick={() => addToCartHandler(product)}
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
