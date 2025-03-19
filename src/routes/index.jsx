// index.jsx
import React from "react";
import MainLayout from "../layout/MainLayout";
import MainPage from "../pages/Main";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "/", element: <MainPage /> }],
  },
];

export default routes;
