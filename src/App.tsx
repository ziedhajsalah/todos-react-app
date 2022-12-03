import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import { Todos } from "./routes/todos";
import { Register } from "./routes/register";
import { Login } from "./routes/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Todos />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
