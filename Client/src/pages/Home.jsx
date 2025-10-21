import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <>
      <div className="w-full h-[86vh] flex items-center justify-center mybg">
        <h1 className="text-2xl font-bold animate-pulse">
          {`${isAuthenticated ? "Welcome back" : "Please Login"}`}
        </h1>
      </div>
    </>
  );
};

export default Home;
