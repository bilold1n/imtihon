import React, { useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./pages/Layout";
import Login from "./pages/login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Mystore from "./pages/mystore";
import Products from "./pages/Products";
import Home from "./pages/home";

function ProtectedRoute({ children }) {
  const { users } = useSelector((state) => state.user);
  return users ? children : <Navigate to="/login" />;
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Products />} />
          <Route path="/yourstore" element={<Mystore />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
