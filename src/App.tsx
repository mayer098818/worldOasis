import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins, { cabinsLoader } from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {Toaster} from "react-hot-toast";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: < AppLayout />,
      children: [
        { index: true, element: <Navigate replace to="dashboard" /> },
        { path: '/dashboard', element: <Dashboard /> },
        { path: '/bookings', element: <Bookings /> },
        { path: '/cabins', element: <Cabins />,loader:cabinsLoader },
        { path: '/users', element: <Users /> },
        { path: '/settings', element: <Settings /> },
        { path: '/account', element: <Account /> }
      ]
    },
    {
      path: 'login',
      element: <Login />
    },
    {
      path: '*',
      element:<PageNotFound />
    }
  ])
  return (
    <>
      <ReactQueryDevtools initialIsOpen={ true} />
     <RouterProvider router={router}></RouterProvider>
      <Toaster position='top-center' gutter={12} containerStyle={{margin:'8px'}} toastOptions={{success:{
      duration:3000,},error:{duration:5000},style:{fontSize:'16px',maxWidth:'500px',padding:'24px',backgroundColor:'var(--color-gray-0)',color:'var(-color-gray-700)'}
      }}/>
    </>
  )
}
export default App;