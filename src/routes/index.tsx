import React from 'react';
import MainLayout from '../layout/MainLayout';
import MainPage from '../pages/MainPage';
import { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [{ path: '/', element: <MainPage /> }],
  },
];

export default routes;