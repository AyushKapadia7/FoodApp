import { useContext } from 'react';

import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import AuthContext, { AuthContextProvider } from '../../../store/auth-context';

const MealItem = (props) => {

  const cartCtx = useContext(AuthContext)

  const price = `Rs ${props.price.toFixed(2)}`;

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
      <AuthContextProvider><MealItemForm onAddToCart={addToCartHandler} /></AuthContextProvider>
      </div>
    </li>
  );
};

export default MealItem;
