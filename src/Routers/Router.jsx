import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import ProtectedRoute from "./ProtectedRoute";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

export default Router;
