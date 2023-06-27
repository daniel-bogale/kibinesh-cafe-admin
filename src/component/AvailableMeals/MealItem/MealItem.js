import styles from "./MealItem.module.css";

const MealItem = (props) => {
  const price = `${props.price.toFixed(2)}Birr`;

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>{price}</div>
      </div>
      <button className={styles.button}>minimize</button>
      {/* <MealItemForm onAddToCart={addToCartHandler} foodName={props.name} /> */}
    </li>
  );
};

export default MealItem;
