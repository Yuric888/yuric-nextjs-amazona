import { CartItem, ProductType } from "@/types/Product.type";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
type StoreProviderProps = {
  children: ReactNode;
};
export enum CartActionType {
  CART_ADD_ITEM = "ADD",
}
type StateCart = {
  cart: { cartItems: CartItem[] };
};
type ActionCart = {
  type: CartActionType;
  payload: CartItem;
};
type StoreProps = {
  state: { cart: { cartItems: CartItem[] } };
  dispatch: Dispatch<ActionCart>;
};
export const Store = createContext({} as StoreProps);

const initialState: StateCart = {
  cart: { cartItems: [] },
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
      return { ...state, cart: { ...state.cart, cartItems } };
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