import {useContext} from 'react';
import AuthContext from '../../store/auth-context';


import classes from './Checkout.module.css';

const Checkout = (props) => {
  const ctx = useContext(AuthContext)

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = ctx.nameInputRef.current.value;
    const enteredStreet = ctx.streetInputRef.current.value;
    const enteredPostalCode = ctx.postalCodeInputRef.current.value;
    const enteredCity = ctx.cityInputRef.current.value;

    const enteredNameIsValid = !ctx.isEmpty(enteredName);
    const enteredStreetIsValid = !ctx.isEmpty(enteredStreet);
    const enteredCityIsValid = !ctx.isEmpty(enteredCity);
    const enteredPostalCodeIsValid = ctx.isFiveChars(enteredPostalCode);

    ctx.setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }

    // Submit cart data
   props.onConfirm({
     name: enteredName,
     street: enteredStreet,
     city: enteredCity,
     postalCode: enteredPostalCode
   })
  };

  const nameControlClasses = `${classes.control} ${
    ctx.formInputsValidity.name ? '' : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    ctx.formInputsValidity.street ? '' : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
  ctx.formInputsValidity.postalCode ? '' : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
  ctx.formInputsValidity.city ? '' : classes.invalid
  }`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={ctx.nameInputRef} />
        {!ctx.formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={ctx.streetInputRef} />
        {!ctx.formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={ctx.postalCodeInputRef} />
        {!ctx.formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={ctx.cityInputRef} />
        {!ctx.formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;