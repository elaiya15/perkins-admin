import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { URL } from "../App";
import axios from "axios";
import  './login.css'



function Login() {
  const navigate = useNavigate();
  const [PasswordVisible, setPasswordVisible] = useState(false);
  const [Response, setResponse] = useState(false);
  const [ResponseMessage, setResponseMessage] = useState("");
  const [ResponseColor, setResponseColor] = useState("");





  const handelForgotPassword=()=>{
    navigate("/ForgotPassward")   
        
      }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    try {
      const response = await axios.post(`${URL}/api/user/login`, data);
      const user = response.data.user;
      window.localStorage.setItem("user", JSON.stringify(user));
      window.localStorage.setItem("token", response.data.token);
      setResponse(true);
      setResponseMessage(response.data.message);
      setResponseColor("text-green-600");
      if (user.isAdmin) {
        setTimeout(() => {
          navigate("/admin/job-post/list");
        }, 1000);
      } else {
        const access =
          user.access_to[0] === "Job Post"
            ? "job-post"
            : user.access_to[0] === "Blogs"
            ? "blogs"
            : user.access_to[0] === "Gallery"
            ? "gallery"
            : user.access_to[0] === "Applicants"
            ? "applicants"
            : user.access_to[0] === "Enquiries & Messages"
            ? "enquiries&messages"
            : " ";
        setTimeout(() => {
          navigate(`/admin/${access}/list`);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setResponse(true);
      setResponseColor("text-red-600");
      setResponseMessage(
        error.response ? error.response.data.message : error.message
      );
      setTimeout(() => {
        setResponse(false);
      }, 5000);
    }
  };
  return (
    <React.Fragment>
         
      <section className="bg-[url('./assets/login-bg-min.png')] bg-cover bg-center bg-no-repeat bg-spangles-800 w-screen h-screen flex-col flex items-center justify-center">
        <div className="relative w-full max-w-xs p-8 bg-white border border-gray-200 shadow  2xl:max-w-lg lg:max-w-sm xl:max-w-md lg:p-10 xl:p-12 rounded-3xl sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form
            className="relative space-y-6 lg:space-y-8 xl:space-y-10 2xl:space-y-12"
            onSubmit={handleSubmit}
          >
            <h5 className="text-xl font-bold text-center text-spangles-900 dark:text-white">
              LOG IN
            </h5>
            <div className="relative">
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-spangles-500 focus:outline-none focus:ring-0 focus:border-spangles-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="username"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-spangles-600 peer-focus:dark:text-spangles-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Username
              </label>
            </div>
            <div className="relative">
              <input
                type={PasswordVisible ? "text" : "password"}
                name="password"
                id="password"
                className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-spangles-500 focus:outline-none focus:ring-0 focus:border-spangles-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-spangles-600 peer-focus:dark:text-spangles-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              >
                Password
              </label>
              <div className="absolute inset-y-0 right-0 flex items-center pr-5 text-sm leading-5 hover:cursor-pointer">
                {PasswordVisible ? (
                  <i
                    onClick={() => setPasswordVisible(false)}
                    className="fa-solid fa-eye text-spangles-800"
                  ></i>
                ) : (
                  <i
                    onClick={() => setPasswordVisible(true)}
                    className="fa-solid fa-eye-slash text-spangles-800"
                  ></i>
                )}
              </div>
            </div>
            <span className="absolute flex items-start justify-end w-full  forgetpassword"><span onClick={()=>handelForgotPassword()} className=" hover:cursor-pointerblock text-[10px]  hover:underline hover:cursor-pointer hover:text-blue-600 sm:text-xs md:text-sm text-gray-500 truncate dark:text-gray-400">Forgot Password</span></span>
            <div className="my-5 text-center">
              {Response && (
                <p className={`${ResponseColor} font-semibold text-sm`}>
                  {ResponseMessage}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-white  bg-spangles-700 hover:bg-spangles-800 focus:ring-4 focus:outline-none focus:ring-spangles-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-spangles-600 dark:hover:bg-spangles-700 dark:focus:ring-spangles-800"
            >
              Login
            </button>
          </form>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Login;
