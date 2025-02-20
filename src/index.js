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
import IntorSignUp from "./Component/IntorSignUp/IntorSignUp";
import IntorSignIn from "./Component/IntorSignIn/IntorSignIn";
import SignUp from "./Component/SignUp/SignUp";
import ResetPassword from "./Component/ResetPassword/ResetPassword";
import ConfirmPassword from "./Component/ResetPassword/ConfirmPassowrd/ConfirmPassword";
import Clients from "./Component/AdminComponent/Clients/Clients.jsx";
import Blacklist from "./Component/AdminComponent/blacklist/blacklist.jsx";
import Brookers from "./Component/AdminComponent/Brookers/Brookers";
import Permissions from "./Component/AdminComponent/Permissions/Permissions.jsx";
import HistoryDoneOrder from "./Component/AccountantComponennt/HistoryOfDoneOrdersAccountant/HistoryDoneOrder.jsx";
import Statistics from "./Component/AdminComponent/statistics/statistics.jsx";
import NewOrder from "./Component/ClientsComponent/NewOrder/NewOrder.jsx";
import Orders from "./Component/ClientsComponent/Orders/Orders.jsx";
import Cart from "./Component/ClientsComponent/Cart/Cart.jsx";
import Mokhalseen from "./Component/Mokhalseen/Mokhalseen.jsx";
import SignUpForMokhalseen from "./Component/SignUpForMokhalseen/SignUpForMokhalseen.jsx";
import BrookersLandingPage from "./Component/BrookersComponent/BrookersLandingPage/BrookersLandingPage.jsx";
import AvailableOrders from "./Component/BrookersComponent/AvailableOrders/AvailableOrders.jsx";
import OrderDetails from "./Component/BrookersComponent/OrderDetails/OrderDetails.jsx";
import CurrentOffers from "./Component/BrookersComponent/CurrentOffers/CurrentOffers.jsx";
import HistoryOfOrders from "./Component/BrookersComponent/HistoryOfOrders/HistoryOfOrders.jsx";
import BrookersCart from "./Component/BrookersComponent/BrookersCart/BrookersCart.jsx";
import LandingPageForUsers from "./Component/LandingPageForUsers/LandingPageForUsers.jsx";
import NewOrderForm from "./Component/ClientsComponent/NewOrder/NewOrder.jsx";
import PendingOrders from "./Component/ClientsComponent/Orders/Orders.jsx";
import OrderDetailsForUser from "./Component/ClientsComponent/OrderDetailsForUser/OrderDetailsForUser.jsx";
import CurrentOrdersForUsers from "./Component/ClientsComponent/CurrentOrdersForUsers/CurrentOrdersForUsers.jsx";
import LandingPageCustomeService from "./Component/CustomerServices/LandingPageCustomeService/LandingPageCustomeService.jsx";
import CanceledOrders from "./Component/CustomerServices/CanceledOrders/CanceledOrders.jsx";
import DoneOrders from "./Component/CustomerServices/DoneOrders/DoneOrders.jsx";
import AccountantLandingPage from "./Component/AccountantComponennt/AccountantLandingPage/AccountantLandingPage.jsx";
import AcceptedOrderAccountant from "./Component/AccountantComponennt/AcceptedOrderAccountant/AcceptedOrderAccountant.jsx";
import DoneOrdersForUser from "./Component/ClientsComponent/DoneOrdersforUSer/DoneOrdersForUser.jsx";
import AllOrderTransfers from "./Component/CustomerServices/AllOrderTransfers/AllOrderTransfers.jsx";
import LandingPageAdmin from "./Component/LandingPageAdmin/LandingPageAdmin.jsx";
import AllOrderDeleted from "./Component/CustomerServices/AllOrderDeleted/AllOrderDeleted.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "OrderDetailsForUser", element: <OrderDetailsForUser /> },
      { path: "availableOrders", element: <AvailableOrders /> },
      { path: "brookersCart", element: <BrookersCart /> },
      { path: "currentOffers", element: <CurrentOffers /> },
      { path: "historyOfOrders", element: <HistoryOfOrders /> },
      { path: "orderDetails", element: <OrderDetails /> },
      { path: "newOrder", element: <NewOrder /> },
      { path: "mokhalseen", element: <Mokhalseen /> },
      { path: "orders", element: <Orders /> },
      { path: "HistoryDoneOrder", element: <HistoryDoneOrder /> },
      {path: "AllOrderTransfers", element: <AllOrderTransfers /> },
      { path: "brookersLandingPage", element: <BrookersLandingPage /> },
      {  path: "LandingPageAdmin", element: <LandingPageAdmin />},
      { path: "Cart", element: <Cart /> },
      { path: "permissions", element: <Permissions /> },
      { path: "statistics", element: <Statistics /> },
      {path:"canceledOrders", element :<CanceledOrders/>},
      {path:"AllOrderDeleted", element :<AllOrderDeleted/>},

      {path:"DoneOrders", element:<DoneOrders/>},
      { path: "IntorSignUp", element: <IntorSignUp /> },
      { path: "IntorSignIn", element: <IntorSignIn /> },
      { path: "LandingPageCustomeService", element: <LandingPageCustomeService /> },
      { path: "LandingPageForUsers", element: <LandingPageForUsers /> },
      { path: "NewOrder", element: <NewOrderForm /> },
      { path: "Orders", element: <PendingOrders /> },
      { path: "Clients", element: <Clients /> },
      { path: "blackList", element: <Blacklist /> },
      { path: "SignIn", element: <SignIn /> },
      { path: "SignUp", element: <SignUp /> },
      { path: "SignUpForCompany", element: <SignUpForCompany /> },
      { path: "SignUpForMokhalseen", element: <SignUpForMokhalseen /> },
      { path: "ResetPassword", element: <ResetPassword /> },
      { path: "ConfirmPassword", element: <ConfirmPassword /> },
      { path: "AccountantLandingPage", element: <AccountantLandingPage /> },
      { path: "LandingPageForUsers", element: <LandingPageForUsers /> },
      { path: "CurrentOrdersForUsers", element: <CurrentOrdersForUsers /> },
      { path: "AcceptedOrderAccountant", element: <AcceptedOrderAccountant /> },
      { path: "DoneOrdersForUser", element: <DoneOrdersForUser /> },


      { path: "brookers", element: <Brookers /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);
