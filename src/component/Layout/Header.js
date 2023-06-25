import { Fragment } from "react";
import HeaderCardButton from "./HeaderCardButton";
import styles from "./Header.module.css";
import mealsImg from "../../assets/meals.jpg";

const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>Kibinesh</h1>
        <HeaderCardButton onClick={props.onToggleCart}></HeaderCardButton>
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsImg} alt="delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
