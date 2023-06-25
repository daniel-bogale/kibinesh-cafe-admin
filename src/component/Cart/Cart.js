import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart_context";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import CheckSvg from "../../assets/CheckSvg";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({
      ...item,
      amount: 1,
    });
  };

  const orderHandler = () => {
    console.log("ordering...");

    setIsCheckout(true);

    console.log(totalAmount);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://react-first-38e92-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({ user: userData, orderedItems: cartCtx.items }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
    } catch (error) {
      setSubmissionError(error.message);
    }
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  let cartOrderingAction = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onToggleCart}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const checkoutContent = (
    <Checkout onConfirm={submitOrderHandler} onCancel={props.onToggleCart} />
  );

  const modalContent = (
    <>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {!isCheckout && cartOrderingAction}
      {isCheckout && checkoutContent}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;
  const didSubmitModalContent = (
    <>
      <div className={styles.successful}>
        <CheckSvg />
        <p>Successfully sent the order!</p>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onToggleCart}>
          Close
        </button>
      </div>
    </>
  );
  const errorSubmitContent = (
    <div>
      <p>{submissionError}try again</p>
    </div>
  );

  return (
    <Modal onClick={props.onToggleCart}>
      {!isSubmitting && !didSubmit && modalContent}
      {isSubmitting && isSubmittingModalContent}
      {didSubmit && didSubmitModalContent}
      {submissionError && errorSubmitContent}
    </Modal>
  );
};
export default Cart;
