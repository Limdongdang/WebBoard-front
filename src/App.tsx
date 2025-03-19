import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import routes from './routes';
import React, { JSX } from "react";

const router = createBrowserRouter(routes);

function App(): JSX.Element {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;