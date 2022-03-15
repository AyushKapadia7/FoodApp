import { useContext, } from 'react';
import AuthContext from '../../store/auth-context';

import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const ctx = useContext(AuthContext)

  return (
    <button className={ctx.btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{ctx.numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
