import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../components/InputField";
import Radio from "../components/Radio";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const SERVER = import.meta.env.VITE_SERVER;

const Auth = ({ signup = false }) => {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(!signup);
  const [isLoading, setLoading] = useState(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const API = `${SERVER}${isLogin ? "/login" : "/signup"}`;
      const { confirmpassword, ...submit } = data;
      const body = {
        email: submit.email,
        password: submit.password,
      };
      if (!isLogin) {
        body.name = submit.name;
        body.type = submit.role;
      }
      console.log(body);
      const res = await axios.post(API, body);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-3 sm:p-4 w-full h-[80vh] flex flex-col items-center justify-center text-black">
        <div className="h-auto min-h-[450px] w-[350px] sm:w-[400px] md:w-[450px] p-3 sm:p-4  max-w-sm sm:max-w-md md:max-w-lg  border border-gray-300 rounded-2xl flex flex-col">
          <h1 className="text-2xl self-start p-2 sm:pb-2 sm:p-0 font-bold">
            {isLogin ? "Login" : "Signup"}
          </h1>
          <div className="w-full px-2 sm:px-0">
            <form
              className="flex flex-col justify-between"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full flex flex-col gap-2 ">
                {/* Name */}
                {!isLogin && (
                  <div className="">
                    <InputField
                      name={"name"}
                      placeholder={"Full Name"}
                      register={register}
                      rules={{
                        required: "Full name is required",
                        minLength: {
                          value: 3,
                          message: "Minimum length should be 3",
                        },
                      }}
                      errors={errors}
                    />
                  </div>
                )}

                {/* Email */}
                <div className="">
                  <InputField
                    name={"email"}
                    placeholder={"Email"}
                    register={register}
                    rules={{ required: "Email is required" }}
                    type="email"
                    errors={errors}
                  />
                </div>

                {!isLogin && (
                  <div className="flex flex-col text-left">
                    <h1>How do you want to Register?</h1>
                    <Radio register={register} name="role" errors={errors} />
                  </div>
                )}

                <div className="">
                  <InputField
                    name={"password"}
                    placeholder={"Password"}
                    type="password"
                    register={register}
                    rules={{
                      required: "Password is Required",
                      minLength: {
                        value: 3,
                        message: "Minimun length of password is 3",
                      },
                    }}
                    errors={errors}
                  />
                </div>

                {!isLogin && (
                  <div className="">
                    <InputField
                      name={"confirmpassword"}
                      placeholder={"Confirm Password"}
                      type="password"
                      register={register}
                      errors={errors}
                      rules={{
                        required: "Please confirm your password",
                        validate: (value) => {
                          const password = watch("password");
                          return value === password || "Passwords don't match";
                        },
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center mt-4">
                <button
                  disabled={isLoading}
                  className="w-full sm:w-auto border border-black rounded-xl px-4 py-2 font-medium hover:bg-gray-100 transition-colors"
                  type="submit"
                >
                  {isLoading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
                </button>
                <div className="text-sm text-center">
                  {isLogin ? (
                    <>
                      Don't Have an Account?{" "}
                      <span
                        className="text-blue-600 cursor-pointer underline font-medium"
                        onClick={() => setLogin(false)}
                      >
                        Signup
                      </span>
                    </>
                  ) : (
                    <>
                      Already Have an Account?{" "}
                      <span
                        className="text-blue-600 cursor-pointer underline font-medium"
                        onClick={() => setLogin(true)}
                      >
                        Login
                      </span>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
