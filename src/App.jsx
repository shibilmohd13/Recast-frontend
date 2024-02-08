import React from 'react'
import Auth from './components/Auth/Auth'
import Home from './components/Home/Home'
import Profile from './components/Profile/Profile'
import Admin from './components/Admin/Admin'
import PageNotFound from './components/PageNotFound/PageNotFound'
import Test from './components/Test/Test'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from 'react-redux'
import { store } from "./store"
import TestAuth from './components/Test/TestAuth'
import { AuthProvider } from './context/AuthProvider'
import PrivateRoute from './utils/PrivateRoute'
import AddUser from './components/Admin/AddUser'
import EditUser from './components/Admin/EditUser'


function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin admin={true} />} />
          <Route path="/add_user" element={<AddUser />} />
          <Route path="/edit_user" element={<EditUser />} />

          

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      // </AuthProvider>
  )
}

export default App