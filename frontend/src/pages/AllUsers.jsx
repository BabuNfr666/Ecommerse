import axios from "axios";
import React, { useEffect } from "react";
import SummaryApi from "../../common";

const AllUsers = () => {
  const fetchAllUsers = async () => {
    try {
      const fetchData = await axios({
        url: SummaryApi.allUser.url,
        method: SummaryApi.allUser.method,
        withCredentials: true,
      });
      const dataResponse = fetchData.data;

      console.log(dataResponse);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <th>Sr.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Create Date</th>
        </thead>
      </table>
    </div>
  );
};

export default AllUsers;
