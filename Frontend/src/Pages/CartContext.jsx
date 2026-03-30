import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, qty = 1) => {
  const productId = product._id || product.id; // ✅ FIX

  setCart((prev) => {
    const exist = prev.find((item) => item._id === productId);

    if (exist) {
      return prev.map((item) =>
        item._id === productId
          ? { ...item, quantity: item.quantity + qty }
          : item
      );
    }

    return [
      ...prev,
      {
        _id: productId,
        name: product.name,
        price: Number(product.price || 0),
        img: product.img || product.image || "",
        quantity: qty, // ✅ FIX
      },
    ];
  });
};

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter((item) => item._id !== id && item.id !== id)
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};