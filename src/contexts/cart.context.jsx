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

const deleteItem = (cartItems, productToDelete) => {
  return cartItems.filter(item => item.id !== productToDelete.id);
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => { },
  cartItems: [],
  addItemToCart: () => { },
  removeItemFromCart: () => { },
  cartCount: 0,
  deleteProductFromCart: () => { },
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0)
    setCartCount(newCartCount);
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  }

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  }

  const deleteProductFromCart = (productToDelete) => {
    setCartItems(deleteItem(cartItems, productToDelete));
  }
  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, deleteProductFromCart }
  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  )
}