import Link from "next/link";
import { ReactNode } from "react";

const DropdownLink = ({
  href,
  children,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <Link href={href} {...rest}>
      <p>{children}</p>
    </Link>
  );
};

export default DropdownLink;
