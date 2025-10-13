import { useState } from "react";
import Start from "./pages/Start";
import {createBrowserRouter,RouterProvider,Outlet} from 'react-router-dom';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Auth from "./pages/Auth";
function Layout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

const router = createBrowserRouter([
  {
    element:<Layout/>,
    children:[
      {path:"/",element:<Start/>},
      {path:"/auth",element:<Auth/>}
    ]
  }
])

function App() {
  return (<RouterProvider router={router}/>); 
}

export default App;
