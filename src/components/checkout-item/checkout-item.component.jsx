import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {

  const { addItemToCart, removeItemFromCart, deleteProductFromCart } = useContext(CartContext);

  const { name, imageUrl, price, quantity } = cartItem;
  return (
    <div className='checkout-item-container'>
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />  
      </div>
    
      <span className="name">{name}</span>
      <span className="quantity">{quantity} </span>
      <span className="price">{price}</span>
      <span onClick={() => addItemToCart(cartItem)} >increment</span>
      <span onClick={() => removeItemFromCart(cartItem)}>decrement</span>
      <div onClick={() => deleteProductFromCart(cartItem)} className="remove-button">&#10005;</div>
    </div>
  )
}
export default CheckoutItem;