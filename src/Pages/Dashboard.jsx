import React, { useContext, useEffect, useState } from "react";
import AddUser from "../Components/AddUser";
import UpdateUser from "../Components/UpdateUser";
import DeleteButton from "../Buttons/DeleteButton";
import LogoutButton from "../Buttons/LogoutButton";
import Search from "../Components/Search";
import { deleteStudent, getStudents } from "../api/student";
import { AuthContext } from "../Context/AuthContext";

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
  const [error, setError] = useState(null);

  const { currentUser } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      setLoading(true);
      const students = await getStudents();
      setData(students);
      setError(null);
    } catch (error) {
      setError("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this")) {
      try {
        await deleteStudent(id);
        setData(data.filter((user) => user.id !== id));
      } catch (error) {
        setError("Failed to delete student.");
      }
    }
  };

  const handleFecth = () => {
    fetchData();
  };

  return (
    <div className="relative overflow-x-auto shadow-md ">
      <div className="flex items-center justify-between px-12 py-4 bg-white dark:bg-gray-900">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Welcome to Student Management System
        </h1>

        <div className=" flex justify-center items-center gap-6 text-white">
          {currentUser ? `${currentUser.email}` : ""}
          <LogoutButton />
        </div>
      </div>
      <div className="flex items-center justify-center gap-20 flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-6 pt-5 bg-white dark:bg-gray-900">
        <AddUser onAddUser={handleFecth} />
        <Search />
      </div>
      <h1 className=" flex justify-center">
        {" "}
        {loading ? "Loading..." : error ? error : ""}
      </h1>
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
                  {/* <img
                    className="w-10 h-10 rounded-full"
                    // src={item.img}
                    alt="User"
                  /> */}
                  <div className="ps-3">
                    <div className="text-base font-semibold">
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
                    <UpdateUser userData={item} onUpdateUser={handleFecth} />
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
