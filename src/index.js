import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Component/Layout/Layout';
import LandingPage from './Component/LandingPage/LandingPage';
import SignIn from './Component/SignIn/SignIn';
import SignUpForCompany from './Component/SignUpForCompany/SignUpForCompany';
import SignInForCompany from './Component/SignInForCompany/SignInForCompany';
import IntorSignUp from './Component/IntorSignUp/IntorSignUp';
import IntorSignIn from './Component/IntorSignIn/IntorSignIn';
import SignUp from './Component/SignUp/SignUp';
import WaitingForData from './Component/WaitingForData/WaitingForData';

const router = createBrowserRouter([

  {path:'',element:<Layout/>,children:[
    {path:'',element:<LandingPage/>},
    {path:'IntorSignUp',element:<IntorSignUp/>},
    {path:'IntorSignIn',element:<IntorSignIn/>},
    {path:'WaitingForData',element:<WaitingForData/>},
    {path:'SignIn',element:<SignIn/>},
    {path:'SignUp',element:<SignUp/>},
    {path:'SignUpForCompany',element:<SignUpForCompany/>},
    {path:'SignInForCompany',element:<SignInForCompany/>},

]}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <RouterProvider router={router} />

);