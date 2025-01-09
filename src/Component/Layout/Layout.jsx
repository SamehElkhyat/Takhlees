import { Outlet } from 'react-router-dom';
import React from 'react'
import NavBar from '../NavBar/NavBar.jsx';


export default function Layout() {
    
    return <div> 
        <NavBar />
        <Outlet />
    </div>
}