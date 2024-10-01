import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from '../../routers/Routers'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from '../../context/AuthContext';

const Layout = () => {
  return (
    <>
    <AuthContextProvider>
    <Header/>
    <ToastContainer />
    <div>
        <Routers/>
    </div>
    <Footer/>
    </AuthContextProvider>
    </>
  )
}

export default Layout