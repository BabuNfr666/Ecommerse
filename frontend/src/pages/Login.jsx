import React, { useContext, useState } from "react";
import loginIcons from "../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import axios from "axios";
import Context from "../../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        url: SummaryApi.signIn.url,
        method: SummaryApi.signIn.method,
        credentials: "include",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      });
      const dataApi = await response.data;

      if (dataApi.success) {
        toast.success(dataApi.message, {
          position: "top-left",
        });

        navigate("/");
        fetchUserDetails();
      }
      if (dataApi.error) {
        toast.error(dataApi.message, {
          position: "top-left",
        });
      } else {
        console.log("Please check email and password");
      }
    } catch (err) {
      console.error("Error signin up:", err.message);
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className=" bg-white p-4 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto ">
            <img src={loginIcons} alt="login icons" />
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  placeholder="Enter email"
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label>Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  onChange={handleOnChange}
                  value={data.password}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  {/* <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span> */}
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot password?
              </Link>
            </div>
            <button className="bg-red-600 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-6 hover:bg-red-700">
              Login
            </button>
          </form>
          <p className="my-5">
            Don't have account ?{" "}
            <Link
              to={"/sign-up"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
