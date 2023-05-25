import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App";
import Getdate from "./component/GetDate";
import GetAtom from "./component/GetAtom";
import UserRegister from "./component/RegisterForm";
import VeriFy from "./component/Verify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "time/:ID",
    element: <Getdate />,
  },
  {
    path: "/time/book/:ID",
    element: <GetAtom />,
  },
  {
    path: true ? "Verify/:phone" : "",
    element: <VeriFy />,
  },
  {
    path: "Register",
    element: <UserRegister />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
