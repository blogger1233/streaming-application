import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './auth/Login.jsx'

import Signup from './auth/Signup.jsx'
import Verify from './auth/Verify.jsx'
import Resource from './resource/Resource.jsx'
import Home from './resource/Home.jsx'
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/verify/:email",
    element: <Verify />
  },
  {
    path: "/resource",
    element: <Resource />,
    children: [
      {

        path: "/resource/home",
        element: <Home />
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
