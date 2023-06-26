import { Fragment } from "react";
import styles from "./Header.module.css";
import mealsImg from "../../assets/meals.jpg";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>Kibinesh Admin</h1>
        <nav className={styles.nav}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              All Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/served"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Served Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/availableMeals"
              className={({ isActive }) => (isActive ? styles.active : "")}
            >
              Available Meals
            </NavLink>
          </li>
        </nav>
      </header>
      {/* navigation to see available meals , current orders , served orders , finished orders waiting customer, kibinesh kitchn for cooked meals */}

      <div className={styles["main-image"]}>
        <img src={mealsImg} alt="delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
