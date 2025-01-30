import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Component/Layout/Layout";
import LandingPage from "./Component/LandingPage/LandingPage";
import SignIn from "./Component/SignIn/SignIn";
import SignUpForCompany from "./Component/SignUpForCompany/SignUpForCompany";
import SignInForCompany from "./Component/SignInForCompany/SignInForCompany";
import IntorSignUp from "./Component/IntorSignUp/IntorSignUp";
import IntorSignIn from "./Component/IntorSignIn/IntorSignIn";
import SignUp from "./Component/SignUp/SignUp";
import WaitingForData from "./Component/WaitingForData/WaitingForData";
import ResetPassword from "./Component/ResetPassword/ResetPassword";
import ConfirmPassword from "./Component/ResetPassword/ConfirmPassowrd/ConfirmPassword";
import ResetThePassword from "./Component/ResetPassword/ResetThePassword/ResetThePassword";
import Clients from "./Component/Clients/Clients";
import Blacklist from "./Component/blacklist/blacklist";
import Brookers from "./Component/Brookers/Brookers";
import CustomService from "./Component/CustomService/CustomService";
import Permissions from "./Component/Permissions/Permissions";
import Statistics from "./Component/statistics/statistics";
import NewOrder from "./Component/NewOrder/NewOrder";
import Orders from "./Component/Orders/Orders";
import Cart from "./Component/Cart/Cart";
import LandingUser from "./Component/LandingUser/LandingUser.jsx";
import Mokhalseen from "./Component/Mokhalseen/Mokhalseen.jsx";
import SignUpForMokhalseen from "./Component/SignUpForMokhalseen/SignUpForMokhalseen.jsx";
import BrookersLandingPage from "./Component/BrookersLandingPage/BrookersLandingPage";
import AvailableOrders from "./Component/AvailableOrders/AvailableOrders";
import OrderDetails from "./Component/OrderDetails/OrderDetails";
import CurrentOffers from "./Component/CurrentOffers/CurrentOffers.jsx";
import HistoryOfOrders from "./Component/HistoryOfOrders/HistoryOfOrders.jsx";
import BrookersCart from "./Component/BrookersCart/BrookersCart.jsx";
import LandingPageForUsers from "./Component/LandingPageForUsers/LandingPageForUsers.jsx";



const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "availableOrders", element: <AvailableOrders /> },
      {path:"brookersCart", element:<BrookersCart/>},
      { path: "currentOffers", element: <CurrentOffers /> },
      { path: "historyOfOrders", element: <HistoryOfOrders /> },
      { path: "orderDetails", element: <OrderDetails /> },
      { path: "newOrder", element: <NewOrder /> },
      { path: "mokhalseen", element: <Mokhalseen /> },
      { path: "orders", element: <Orders /> },
      { path: "brookersLandingPage", element: <BrookersLandingPage /> },
      { path: "landingUser", element: <LandingUser /> },
      { path: "Cart", element: <Cart /> },
      { path: "permissions", element: <Permissions /> },
      { path: "statistics", element: <Statistics /> },
      { path: "customService", element: <CustomService /> },
      { path: "IntorSignUp", element: <IntorSignUp /> },
      { path: "IntorSignIn", element: <IntorSignIn /> },
      { path: "Clients", element: <Clients /> },
      { path: "blackList", element: <Blacklist /> },
      { path: "WaitingForData", element: <WaitingForData /> },
      { path: "SignIn", element: <SignIn /> },
      { path: "SignUp", element: <SignUp /> },
      { path: "SignUpForCompany", element: <SignUpForCompany /> },
      { path: "SignUpForMokhalseen", element: <SignUpForMokhalseen /> },
      { path: "ResetPassword", element: <ResetPassword /> },
      { path: "ConfirmPassword", element: <ConfirmPassword /> },
      { path: "SignInForCompany", element: <SignInForCompany /> },
      { path: "ResetThePassword", element: <ResetThePassword /> },
      {path:'LandingPageForUsers', element: <LandingPageForUsers/>},

      { path: "brookers", element: <Brookers /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
