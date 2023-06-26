import Header from "./component/Layout/Header";
import AvailableMeals from "./component/AvailableMeals/Meals";
import Orders from "./component/Orders/Orders";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Orders />}></Route>
          <Route path="/served" element={<Orders served={true} />}></Route>
          <Route path="/availableMeals" element={<AvailableMeals />}></Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
