import Header from "./component/Layout/Header";
import AvailableMeals from "./component/AvailableMeals/Meals";
import Orders from "./component/Orders/Orders";
function App() {
  return (
    <>
      <Header />
      <main>
        {/* <Orders /> */}
        <Orders served={true} />

        {/* <AvailableMeals /> */}
      </main>
    </>
  );
}

export default App;
