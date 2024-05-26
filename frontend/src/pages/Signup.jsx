import React, { useState } from "react";
import loginIcons from "../assets/signin.gif";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import axios from "axios";
import SummaryApi from "../../common";
import { toast } from "react-toastify";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (data.password === data.confirmPassword) {
        const response = await axios({
          url: SummaryApi.signUp.url,
          method: SummaryApi.signUp.method,
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        });
        const dataApi = await response.data;

        if (dataApi.success) {
          toast.success(dataApi.message);
          navigate("/login");
        }
        if (dataApi.error) {
          toast.error(dataApi.message);
        }
      } else {
        console.log("Please check password and confirm password");
      }
    } catch (err) {
      console.error("Error signing up:", err.message);
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((prev) => ({ ...prev, profilePic: imagePic }));
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-4 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <img src={data.profilePic || loginIcons} alt="login icons" />
            <form>
              <label>
                <div className="text-xs bg-slate-200 bg-opacity-80 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <div>
                <label>Name:</label>
                <div className="bg-slate-100 p-2">
                  <input
                    type="text"
                    name="name"
                    required
                    value={data.name}
                    placeholder="Enter your name"
                    onChange={handleOnChange}
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
              </div>
              <div>
                <label>Email:</label>
                <div className="bg-slate-100 p-2">
                  <input
                    type="email"
                    name="email"
                    required
                    value={data.email}
                    placeholder="Enter email"
                    onChange={handleOnChange}
                    className="w-full h-full outline-none bg-transparent"
                  />
                </div>
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
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {/* {showPassword ? <FaEyeSlash /> : <FaEye />} */}
                </div>
              </div>
            </div>
            <div>
              <label>Confirm Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter confirm password"
                  name="confirmPassword"
                  required
                  onChange={handleOnChange}
                  value={data.confirmPassword}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {/* {showConfirmPassword ? <FaEyeSlash /> : <FaEye />} */}
                </div>
              </div>
            </div>
            <button className="bg-red-600 text-white w-full px-6 py-2 max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-6 hover:bg-red-700">
              Sign Up
            </button>
          </form>
          <p className="my-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
