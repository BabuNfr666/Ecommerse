import React, { useState } from "react";
import Logo from "./Logo";
import { IoSearch } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import SummaryApi from "../../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const fetchData = await axios({
      method: SummaryApi.user_logout.method,
      url: SummaryApi.user_logout.url,
      withCredentials: true,
    });

    const data = fetchData.data;
    console.log("data", data);
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }
    if (data.error) {
      toast.error(data.error);
    }
  };

  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-6 justify-between">
        <div>
          <Link to={"/"}>
            {/* <Logo w={90} h={50} /> */}
            Logo
          </Link>
        </div>

        <div className=" hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search product here..."
            className="w-full outline-none "
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <IoSearch />
          </div>
        </div>

        <div className="flex items-center gap-7 ">
          <div className="relative group flex justify-center ">
            <div
              className=" text-3xl cursor-pointer"
              onClick={() => setMenuDisplay((preve) => !preve)}
            >
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <FaRegCircleUser />
              )}
            </div>
            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded ">
                <nav>
                  <Link
                    to={"admin-panel"}
                    className="whitespace-nowrap md:block hover:bg-slate-100 p-2"
                  >
                    Admin Panel{" "}
                  </Link>
                </nav>
              </div>
            )}
          </div>

          <div className="text-2xl relative">
            <span>
              <MdShoppingCart />
            </span>
            <div className="text-sm bg-red-600 text-white w-5 h-5 p-1 rounded-full flex items-center justify-center absolute -top-2 -right-3">
              0
            </div>
          </div>
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-600 text-white rounded-full hover:bg-red-700 "
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 bg-red-600 text-white rounded-full hover:bg-red-700 "
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
