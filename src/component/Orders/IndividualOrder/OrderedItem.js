import styles from "./OrderedItem.module.css";
const OrderedItem = (props) => {
  const orderedDetail = props.userOrders.map((orders) => (
    <div className={styles["order-detail"]}>
      <div key={orders.name} className={styles.flex}>
        <h3>{orders.name}</h3>
        <h3>x{orders.amount}</h3>
      </div>
    </div>
  ));
  return (
    <li>
      <section className={styles["order-section"]}>
        <h2 className={styles.title}>Foods</h2>
        <hr />
        {orderedDetail}
      </section>
      <hr />
      <section className={styles["user-section"]}>
        <h2 className={styles.title}>Customer info</h2>
        <hr />
        <div className={styles.flex}>
          <h3>Name</h3>
          <h3>{props.user.name}</h3>
        </div>
        <div className={styles.flex}>
          <h3>Phone No</h3>
          <h3>{props.user.phoneNumber}</h3>
        </div>
      </section>
    </li>
  );
};

export default OrderedItem;
