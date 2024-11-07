import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
