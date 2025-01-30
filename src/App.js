import './App.css';
import React from 'react';
import NavBar from './Component/NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import { IdProvider } from './Component/IdContext/IdContext';

function App() {

return <>


<IdProvider>
<NavBar/>
<Outlet/>

</IdProvider>

  </>
}

export default App;
