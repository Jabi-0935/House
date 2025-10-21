import { useState } from "react";
import Home from "./pages/Home";
import {createBrowserRouter,RouterProvider,Outlet} from 'react-router-dom';
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Auth from "./pages/Auth";
import ProtectedRoute from "./components/ProtectedRoute";
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
      {path:"/",element:<Home/>},
      {path:"/auth",element:<Auth/>},
      {path:"/",element:(ProtectedRoute)


      }
    ]
  }
])

function App() {
  return (<RouterProvider router={router}/>); 
}

export default App;
