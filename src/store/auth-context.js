import React from "react";
import { useState,useContext,useEffect,useReducer,useRef} from "react";
import classes from "../components/Layout/HeaderCartButton.module.css"



const AuthContext = React.createContext({
    cartIsShown: false,
    btnIsHighlighted: false,
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    isCheckout: false,
    isSubmitting: false,
    didSubmit: false,
    formInputsValidity: ({ name: true,
      street: true,
      city: true,
      postalCode: true,}),
    meals:([]),
    isLoading:true,
    httpError: ({}),
    amountIsValid:true  
})

export const AuthContextProvider = (props) => {
    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
      setCartIsShown(true);
    };
    
    const hideCartHandler = () => {
      setCartIsShown(false);
    }; 


    //<------------------------------------CartContextProvider ------------------------------------>
    const defaultCartState = {
      items: [],
      totalAmount: 0,
    };

    const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }

  if (action.type === 'CLEAR') {
    return defaultCartState;
  }

  return defaultCartState;
};
      const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
      );
    
      const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: 'ADD', item: item });
      };
    
      const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ type: 'REMOVE', id: id });
      };


    //   <------------------ButtonContext------------------------>

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const cartCtx = useContext(AuthContext)

  const { items } = cartCtx;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);


  // <----------------Submitting State------------------->

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)


  // <------------------CheckOut------------------->
  const [isCheckout, setIsCheckout] = useState(false) 
  
  const orderHandler = () => {
    setIsCheckout(true)
  }

  const isEmpty = (value) => value.trim() === '';
  const isFiveChars = (value) => value.trim().length === 5;

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
// <--------Available  Meals--------->
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState()

  // <-------------Amount----------------->

  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

    return(
        <AuthContext.Provider 
        value={{
             cartIsShown: cartIsShown, 
             hideCartHandler:hideCartHandler,
             showCartHandler:showCartHandler,
             items: cartState.items,
             totalAmount: cartState.totalAmount,
             addItem: addItemToCartHandler,
             removeItem: removeItemFromCartHandler,
             btnIsHighlighted:btnIsHighlighted,
             btnClasses:btnClasses,
             numberOfCartItems:numberOfCartItems,
             isCheckout:isCheckout,
             orderHandler:orderHandler,
             isSubmitting:isSubmitting,
             setIsSubmitting:setIsSubmitting,
             didSubmit:didSubmit,
             setDidSubmit:setDidSubmit,
             formInputsValidity:formInputsValidity,
             setFormInputsValidity:setFormInputsValidity,
             nameInputRef:nameInputRef,
             streetInputRef:streetInputRef,
             postalCodeInputRef:postalCodeInputRef,
             cityInputRef:cityInputRef,
             isEmpty:isEmpty,
             isFiveChars:isFiveChars,
             meals:meals,
             setMeals:setMeals,
             isLoading:isLoading,
             setIsLoading:setIsLoading,
             httpError:httpError,
             setHttpError:setHttpError,
             amountIsValid:amountIsValid,
             setAmountIsValid:setAmountIsValid,
             amountInputRef:amountInputRef,
             }}>
             {props.children}
             </AuthContext.Provider>
          )
}
                    
                 
export default AuthContext


