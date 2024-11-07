import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthContextProvider } from "./Context/AuthContext";
import { RouterProvider } from "react-router-dom";
import Router from "./Routers/Router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={Router} />
    </AuthContextProvider>
  </React.StrictMode>
);
