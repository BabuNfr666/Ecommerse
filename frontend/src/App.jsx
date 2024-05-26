import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SummaryApi from "../common";
import axios from "axios";
import Context from "../context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();

  const fetchUserDetails = async () => {
    try {
      const response = await axios({
        method: SummaryApi.current_user.method,
        url: SummaryApi.current_user.url,
        withCredentials: true,
      });
      ``;
      const dataApi = await response.data;

      if (dataApi.success) {
        dispatch(setUserDetails(dataApi.data));
      }
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userDetails = await fetchUserDetails();
        //
      } catch (error) {
        throw new Error(error.message);
      }
    };

    getUserDetails();
  }, []);

  return (
    <>
      <Context.Provider value={{ fetchUserDetails }}>
        <ToastContainer />
        <Header />
        <main className="min-h-[calc(100vh-120px)]">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
