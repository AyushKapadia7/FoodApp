import React from 'react';
import { useContext } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import AuthContext from '../../store/auth-context';
import Checkout from './Checkout';

const Cart = (props) => {

  const cartCtx = useContext(AuthContext)

  const totalAmount = `Rs ${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const submitOrderHandler = async (userData) => {
    cartCtx.setIsSubmitting(true);
        await fetch("https://react-http-47f2f-default-rtdb.firebaseio.com/orders.json",{
           method: "POST",
           body: JSON.stringify({
             user: userData,
             orderedItems: cartCtx.items
           })
         })
         cartCtx.setIsSubmitting(false)
         cartCtx.setDidSubmit(true)
  }

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = <div className={classes.actions}>
  <button className={classes['button--alt']} onClick={props.onClose}>
    Close
  </button>
  {hasItems && <button className={classes.button} onClick={cartCtx.orderHandler} >Order</button>}
</div>

const cartModalContent = <React.Fragment>
{cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {cartCtx.isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel = {props.onClose} />}
      {!cartCtx.isCheckout && modalActions}
</React.Fragment>

const loadingData = <p>Sending Your Order!</p>

const successData = <p>Order Sent Successfully !</p>

  return (
    <Modal onClose={props.onClose}>
      {!cartCtx.isSubmitting && !cartCtx.didSubmit && cartModalContent}
      {cartCtx.isSubmitting && loadingData}
      {!cartCtx.isSubmitting && cartCtx.didSubmit && successData}
    </Modal>
  );
};

export default Cart;
