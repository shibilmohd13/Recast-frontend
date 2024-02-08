// PrivateRoute.js
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import Home from '../components/Home/Home';
import Admin from '../components/Admin/Admin';
import { useSelector } from 'react-redux';


const PrivateRoute = ({ element, ...props }) => {
  // const {userInfo} = useSelector((state)=>state.auth)


  // return userInfo ? (
  //   <Admin admin={true} />
  // ) : (
  //   <Navigate to="/" replace />
  // );
  return <Admin admin={true} />
};

export default PrivateRoute;
