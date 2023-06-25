import { useEffect, useState } from "react";
import Card from "../UI/Card";
import styles from "./Orders.module.css";
import OrderedItem from "./IndividualOrder/OrderedItem";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    let url =
      "https://react-first-38e92-default-rtdb.firebaseio.com/orders.json";

    if (props?.served) {
      url =
        "https://react-first-38e92-default-rtdb.firebaseio.com/servedOrder.json";
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

        console.log(ordersList);
        setOrders(ordersList);
      } catch (err) {
        console.log(err, "error");
      }
    };

    getOrders();
    setInterval(() => {
      getOrders();
    }, 5000);
  }, []);

  const sortedOrders = orders.sort(function (a, b) {
    return a.time - b.time;
  });
  const ordersList = sortedOrders.map((order) => (
    <Card>
      <OrderedItem
        key={order.key}
        userOrders={order.orderedItems}
        user={order.user}
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

      <ul>{orders.length > 0 && ordersList}</ul>
      {orders.length === 0 && (
        <Card>
          <p>There is no order for now</p>
        </Card>
      )}
    </section>
  );
};

export default Orders;
