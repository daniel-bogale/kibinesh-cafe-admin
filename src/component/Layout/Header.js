import { Fragment } from "react";
import styles from "./Header.module.css";
import mealsImg from "../../assets/meals.jpg";

const Header = () => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>Kibinesh Admin</h1>
      </header>
      {/* navigation to see available meals , current orders , served orders , finished orders waiting customer, kibinesh kitchn for cooked meals */}
      <div className={styles["main-image"]}>
        <img src={mealsImg} alt="delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
