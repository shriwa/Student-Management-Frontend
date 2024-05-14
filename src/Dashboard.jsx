import React, { useEffect, useState } from "react";
import AddUser from "./Components/AddUser";
import UpdateUser from "./Components/UpdateUser";
import DeleteButton from "./DeleteButton";

const Dashboard = () => {
  const heading = [
    { name: "ID" },
    { name: "Name" },
    { name: "Email" },
    { name: "Study Programme" },
    { name: "Address" },
    { name: "Age" },
    { name: "Action" },
  ];

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    //Fetch data
    const fetchdata = async () => {
      try {
        // Fetched data from api
        const response = await fetch("https://localhost:7162/api/Students");
        // Check if the request was successful
        if (!response.ok) {
          throw new Error("Fetch data failed");
        }
        // Parse JSON response
        const jsonData = await response.json();
        // Set fetched data in state
        setData(jsonData);
        // Set loading state
        setLoading(false);
      } catch (error) {
        console.error("Fetch data failed", error);
        // Set loading state
        setLoading(false);
      }
    };

    fetchdata();
  }, []);

  const fetchedData = async () => {
    try {
      // Fetched data from api
      const response = await fetch("https://localhost:7162/api/Students");
      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Fetch data failed");
      }
      // Parse JSON response
      const jsonData = await response.json();
      // Set fetched data in state
      setData(jsonData);
      // Set loading state
      setLoading(false);
    } catch (error) {
      console.error("Fetch data failed", error);
      // Set loading state
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this")) {
      try {
        const response = await fetch(
          `https://localhost:7162/api/Students/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        // Remove the deleted user from the state
        setData(data.filter((user) => user.id !== id));
        alert("User deleted successfully");
      } catch (error) {
        console.error("Failed to delete user", error);
      }
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md ">
      <div className=" flex items-center justify-center gap-20 flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-6 pt-5 bg-white dark:bg-gray-900">
        {" "}
        <div>
          <AddUser />
        </div>
        <div className="">
          <label for="table-search" class="sr-only">
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>
        </div>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {heading.map((item, index) => (
              <th key={index} scope="col" className="p-4">
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4">{item.id}</td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <img
                    className="w-10 h-10 rounded-full"
                    // src={item.img}
                    alt="Jese image"
                  />

                  <div className="ps-3">
                    <div className="text-base font-semibold">
                      {" "}
                      {item.firstName}
                    </div>
                    <div className="font-normal text-gray-500">
                      {item.lastName}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.program}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">{item.address}</div>
                </td>
                <td className="px-6 py-4">{item.age}</td>
                <td className="px-4 py-4">
                  <div className="flex gap-4">
                    <button onClick={() => handleDelete(item.id)}>
                      <DeleteButton />
                    </button>
                    <UpdateUser userData={item} onUpdateUser={fetchedData} />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
