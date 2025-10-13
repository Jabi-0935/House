import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../components/InputField";

const Auth = (login = false) => {
  const [isLogin, setLogin] = useState(login);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = () => {
    console.log("Submitted");
  };

  return (
    <>
      <div className="p-3 sm:p-5 w-full min-h-[80vh] flex flex-col flex-grow items-center justify-center text-center text-black">
        <div className="h-auto min-h-[450px] w-[350px] sm:w-[400px] md:w-[450px] p-3 sm:p-5 border border-gray-300 rounded-2xl flex flex-col items-center justify-start">
          <h1 className="text-3xl self-start p-2 font-bold">
            {isLogin ? "Login" : "Singup"}
          </h1>
          <div className="w-full px-3 py-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full bg-amber-800">
                <InputField head={"Full Name"} message={"enter"} />
              </div>

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
