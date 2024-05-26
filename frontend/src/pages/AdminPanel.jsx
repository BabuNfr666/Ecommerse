import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import "../../src/App.css";
import { Link, Outlet } from "react-router-dom";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-sfull w-full max-w-60 shadow-[0_8px_30px_rgb(0,0,0,0.1)] py-4">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className=" text-4xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user?.name}
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p>{user?.role}</p>
        </div>
        <div>
          <nav className="grid p-4">
            <Link to={"all-user"} className="px-2 py-1 hover:bg-slate-100">
              All Users
            </Link>
            <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">
              All products
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full h-full p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
