import { createContext, useState } from "react"


type CartItem = {
    name: string;
    price: number;
    currency: string;
    size: number;
    image: string;
};




type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemName: string, size: number) => void;
  clearCart: () => void;
  total: number;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  total: 0,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev: any) => [...prev, item]);
  };

  const removeFromCart = (itemName: string, size: number) => {
    setCartItems((prev: any) =>
      prev.filter((i: any) => !(i.name === itemName && i.size === size))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const total = cartItems.reduce((sum: any, item: any) => sum + item.price, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

