import styles from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";
const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
    averageCookingTime: 30,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
    averageCookingTime: 40,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
    averageCookingTime: 50,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
    averageCookingTime: 20,
  },
];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  // one time code
  useEffect(() => {
    const postMeals = async () => {
      try {
        fetch(
          "https://react-first-38e92-default-rtdb.firebaseio.com/meals.json",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(DUMMY_MEALS),
          }
        );
      } catch (err) {
        setHttpError("error on posting current Meals");
      }
    };
    postMeals();
  });
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://react-first-38e92-default-rtdb.firebaseio.com/meals.json"
        );

        if (!response.ok) {
          console.log("error");
          throw new Error("Something went wrong");
        }

        const responseData = await response.json();
        const loadedMeals = [];
        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price,
          });
        }

        setMeals(loadedMeals);
      } catch (error) {
        setHttpError(error.message);
      }
    };

    fetchMeals();

    setIsLoading(false);
  }, []);

  if (httpError) {
    return (
      <section className={styles["meals-error"]}>
        <p>{httpError}</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={styles["meals-loading"]}>
        <p>Loading...</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
      name={meal.name}
      key={meal.id}
      id={meal.id}
      price={meal.price}
      description={meal.description}
    >
      {meal.name}
    </MealItem>
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
