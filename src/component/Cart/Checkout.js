import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const is2Chars = (value) => value.trim().length > 1;
const is10Chars = (value) => value.trim().length === 10;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    id: true,
    phoneNumber: true,
    blockNumber: true,
  });
  const nameInputRef = useRef();
  const idInputRef = useRef();
  const blockNumberInputRef = useRef();
  const phoneNumberInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredId = idInputRef.current.value;
    const enteredBlockNumber = blockNumberInputRef.current.value;
    const enteredPhoneNumber = phoneNumberInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredIdIsValid = is10Chars(enteredId);
    const enteredPhoneNumberIsValid = is10Chars(enteredPhoneNumber);
    const enteredBlockNumberIsValid = is2Chars(enteredBlockNumber);

    const formIsValid =
      enteredNameIsValid &&
      enteredPhoneNumberIsValid &&
      enteredBlockNumberIsValid &&
      enteredIdIsValid;
    setFormInputsValidity({
      name: enteredNameIsValid,
      id: enteredIdIsValid,
      phoneNumber: enteredPhoneNumberIsValid,
      blockNumber: enteredBlockNumberIsValid,
    });
    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      id: enteredId,
      phoneNumber: enteredPhoneNumber,
      blockNumber: enteredBlockNumber,
    });
  };

  const nameInputClass = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const idInputClass = `${classes.control} ${
    formInputsValidity.id ? "" : classes.invalid
  }`;
  const blockNumberInputClass = `${classes.control} ${
    formInputsValidity.blockNumber ? "" : classes.invalid
  }`;
  const phoneNumberInputClass = `${classes.control} ${
    formInputsValidity.phoneNumber ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameInputClass}>
        <label htmlFor="name" placeholder="name">
          Your Name
        </label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && (
          <p className="invalid-message">Please enter a valid name!</p>
        )}
      </div>
      <div className={idInputClass}>
        <label htmlFor="id">Id Number</label>
        <input type="text" id="id" placeholder="ETS-1234/12" ref={idInputRef} />
        {!formInputsValidity.id && (
          <p className="invalid-message">Please enter a valid id!</p>
        )}
      </div>
      <div className={blockNumberInputClass}>
        <label htmlFor="blockNumber">Block Number</label>
        <input
          type="text"
          id="blockNumber"
          ref={blockNumberInputRef}
          placeholder="B12"
        />
        {!formInputsValidity.blockNumber && (
          <p className="invalid-message">Please enter a valid Block Number!</p>
        )}
      </div>
      <div className={phoneNumberInputClass}>
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          placeholder="09..."
          ref={phoneNumberInputRef}
        />
        {!formInputsValidity.phoneNumber && (
          <p className="invalid-message">Please enter a valid PhoneNumber</p>
        )}
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
