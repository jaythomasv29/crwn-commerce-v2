import { useState, createContext, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id)
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      // if the same product exists in the cartItems as the product being added
      cartItem.id === productToAdd.id ?
        // increment the quantity of the specific item object
        { ...cartItem, quantity: cartItem.quantity + 1 } :
        cartItem
    )
  }
  // spread the cartItems and add 'quantity' property of 1
  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, productToRemove) => {
  if (productToRemove.quantity === 1) {
    return cartItems.filter(item => item.id !== productToRemove.id)
  }

  return cartItems.map((cartItem) => (
    cartItem.id === productToRemove.id ?
      { ...cartItem, quantity: cartItem.quantity - 1 } :
      cartItem
  ));
}

const clearItem = (cartItems, productToClear) => {
  return cartItems.filter(item => item.id !== productToClear.id);
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  cartCount: 0,
  clearProductFromCart: () => { },
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0)
    setCartCount(newCartCount);
  }, [cartItems])

  useEffect(() => {
    const total = cartItems.reduce((acc, cartItem) => {
      return acc + (cartItem.quantity * cartItem.price)
    }, 0)
    setCartTotal(total)
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  }

  const clearProductFromCart = (productToClear) => {
    setCartItems(clearItem(cartItems, productToClear));
  }
  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearProductFromCart, cartTotal }
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}