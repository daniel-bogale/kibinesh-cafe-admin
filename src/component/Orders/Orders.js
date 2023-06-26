import { useEffect, useState } from "react";
import Card from "../UI/Card";
import styles from "./Orders.module.css";
import OrderedItem from "./IndividualOrder/OrderedItem";

let first = true;
const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const [revisedOrders, setRevisedOrders] = useState(orders);
  const [servedOrders, setServedOrders] = useState([]);

  const onServedHandler = (id) => {
    const currentServedOrder = orders.find((order) => order.key === id);
    let allServedOrders = servedOrders;
    allServedOrders.push(currentServedOrder);

    setServedOrders(allServedOrders);

    const revisedOrders = orders.filter((order) => order.key !== id);
    setRevisedOrders(revisedOrders);
  };

  useEffect(() => {
    let url =
      "https://react-first-38e92-default-rtdb.firebaseio.com/orders.json";

    if (props?.served) {
      console.log("props is served");
      url =
        "https://react-first-38e92-default-rtdb.firebaseio.com/servedOrders.json";
    }
    const getOrders = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("error 404");
        }
        const responseData = await response.json();
        let ordersList = [];

        for (const key in responseData) {
          ordersList.push({
            key: key,
            orderedItems: responseData[key].orderedItems,
            user: responseData[key].user,
            time: responseData[key].time,
          });
        }

        if (props?.served) {
          setServedOrders(ordersList);
        }
        setOrders(ordersList);
      } catch (err) {
        console.log(err, "error");
      }
    };

    getOrders();

    // setInterval(() => {
    //   getOrders();
    // }, 1000);
  }, []);

  useEffect(() => {
    if (first) {
      first = false;
      return;
    }
    setOrders(revisedOrders);

    const postServedOrders = async () => {
      try {
        fetch(
          "https://react-first-38e92-default-rtdb.firebaseio.com/servedOrders.json",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(servedOrders),
          }
        );
      } catch (err) {
        console.log("error on posting current Meals");
      }
    };

    const postOrders = async () => {
      try {
        fetch(
          "https://react-first-38e92-default-rtdb.firebaseio.com/orders.json",
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(revisedOrders),
          }
        );
      } catch (err) {
        console.log("error on posting current Meals");
      }
    };

    console.log(servedOrders);

    postServedOrders();
    postOrders();
  }, [revisedOrders]);

  let listContents = orders;
  let listType = "orders";
  if (props?.served) {
    listContents = servedOrders;
    listType = "served";
  }
  const sortedListContent = listContents.sort(function (a, b) {
    return a.time - b.time;
  });
  const contentAjx = sortedListContent.map((order) => (
    <Card key={order.key}>
      <OrderedItem
        type={listType}
        id={order.key}
        key={order.key}
        userOrders={order.orderedItems}
        user={order.user}
        onServed={onServedHandler}
      >
        list
      </OrderedItem>
    </Card>
  ));

  return (
    <section className={styles.orders}>
      <Card>
        {!props?.served && <h2>All Orders</h2>}
        {props?.served && <h2>All Served Orders</h2>}
      </Card>

      <ul>{orders.length > 0 && contentAjx}</ul>
      {orders.length === 0 && (
        <Card>
          <p>There is no order for now</p>
        </Card>
      )}
    </section>
  );
};

export default Orders;
