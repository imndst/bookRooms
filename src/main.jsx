import React from "react";
import ReactDOM from "react-dom/client";
import { Outlet, Link, useParams } from "react-router-dom";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App";
import Getdate from "./component/GetDate";
import GetAtom from "./component/GetAtom";
import UserRegister from "./component/RegisterForm";
import VeriFy from "./component/Verify";
import Wallet from "./component/Wallet";
import WalletRoute from "./component/Header";
import Footer from "./component/footer";
import Home from "./component/home";
import Ath from "./component/athur";
import Report from "./component/report";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/main",
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
  {
    path: "Wallet/:id",
    element: <Wallet />,
  },
  {
    path: "Wallet/:id",
    element: <WalletRoute />,
  },
  {
    path: "pay",
    element: <Ath />,
  },
  {
    path: "Report/:status",
    element: <Report />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WalletRoute />
    <RouterProvider router={router} />
    <Footer />
  </React.StrictMode>
);
