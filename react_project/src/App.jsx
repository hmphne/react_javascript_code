import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Table, { tableLoader } from "./pages/Table";
import Searchbar from "./pages/Searchbar";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/table" element={<Table />} loader={tableLoader} />
        <Route path="/searchbar" element={<Searchbar />}/>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
