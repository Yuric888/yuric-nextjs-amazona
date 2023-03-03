import {
  CartItem,
  ProductType,
  shippingAddressType,
} from "@/types/Product.type";
import Cookies, { CookiesStatic } from "js-cookie";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
type StoreProviderProps = {
  children: React.ReactElement | React.ReactElement[];
};
export enum CartActionType {
  CART_ADD_ITEM = "ADD",
  CART_REMOVE_ITEM = "REMOVE",
  CART_RESET = "RESET",
  SAVE_SHIPPING_ADDRESS = "SAVE_SHIPPING_ADDRESS",
  SAVE_PAYMENT_METHOD = "SAVE_PAYMENT_METHOD",
}
type StateCart = {
  cart: {
    cartItems?: CartItem[];
    shippingAddress?: shippingAddressType;
    paymentMethod?: string;
  };
};
type ActionCart = {
  type: CartActionType;
  payload: any;
};
type StoreProps = {
  state: {
    cart: {
      cartItems?: CartItem[];
      shippingAddress?: shippingAddressType;
      paymentMethod?: string;
    };
  };
  dispatch: Dispatch<ActionCart>;
};
export const Store = createContext({} as StoreProps);

const initialState: StateCart = {
  cart: Cookies.get("cartItems")
    ? JSON.parse(Cookies.get("cartItems"))
    : { cartItems: [], shippingAddress: {}, paymentMethod: "" },
};
function reducer(state: StateCart, action: ActionCart) {
  switch (action.type) {
    case CartActionType.CART_ADD_ITEM: {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set("cartItems", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case CartActionType.CART_REMOVE_ITEM: {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      Cookies.set("cartItems", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case CartActionType.CART_RESET: {
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: "",
        },
      };
    }
    case CartActionType.SAVE_SHIPPING_ADDRESS: {
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            ...action.payload,
          },
        },
      };
    }
    case CartActionType.SAVE_PAYMENT_METHOD: {
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMehod: action.payload,
        },
      };
    }
    default:
      return state;
  }
}
export function StoreProvider({ children }: StoreProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const value = { state, dispatch };
  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
}
export const useProductContext = () => {
  return useContext(Store);
};
