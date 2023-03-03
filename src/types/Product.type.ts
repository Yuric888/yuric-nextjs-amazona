export type ProductType = {
  name: string;
  slug: string;
  category: string;
  image: string;
  price: number;
  brand: string;
  rating: number;
  numberReviews: number;
  countInStock: number;
  description: string;
};
export type CartQuantity = {
  quantity: number;
};

export type CartItem = ProductType & CartQuantity;

export type shippingAddressType = {
  fullName?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
};
