import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const entredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFiveChars(enteredPostal);

    setFormInputValidity({
      name: entredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalIsValid,
    });

    const formIsValid =
      enteredPostalIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      entredNameIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
        name:enteredName,
        street:enteredStreet,
        city:enteredCity,
        postalCode:enteredPostal
    });
  };

  const nameControlClass = `${classes.control} ${
    formInputValidity.name ? "" : classes.invalid
  }`;
  const streetControlClass = `${classes.control} ${
    formInputValidity.street ? "" : classes.invalid
  }`;
  const cityControlClass = `${classes.control} ${
    formInputValidity.city ? "" : classes.invalid
  }`;
  const postalControlClass = `${classes.control} ${
    formInputValidity.postalCode ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClass}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name...</p>}
      </div>
      <div className={streetControlClass}>
        <label htmlFor="street">Address</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && (
          <p>Please enter a valid street name...</p>
        )}
      </div>
      <div className={postalControlClass}>
        <label htmlFor="postal">Pin Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postalCode && (
          <p>Please enter a valid postal code...</p>
        )}
      </div>
      <div className={cityControlClass}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid city name...</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
