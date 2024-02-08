import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import baseUrl from "../constants/constants";

const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {

  

  const [user, setUser] = useState(localStorage.getItem("authTokens")?jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access)   :null);
  const [authTokens, setAuthTokens] = useState(localStorage.getItem("authTokens")?JSON.parse(localStorage.getItem('authTokens')):null);
  const [loading, setLoading] = useState(true)


  const logout = () => {
    setUser(null)
    setAuthTokens(null)
    localStorage.removeItem("authTokens");
    navigate('/')

  }

  const updateToken = async ()=>{
    console.log("token updated")
    let refresh_token = JSON.stringify({'refresh':authTokens.refresh})
    let response = await fetch(`${baseUrl}api/token/refresh/`,
        {method : "POST",
        headers:{
            "Content-Type":'application/json'
        },
        body:refresh_token
    })
    let data = await response.json()

    if (response.status==200){
        setAuthTokens(data)
        setUser(jwtDecode(data.access))
        localStorage.setItem('authTokens',JSON.stringify(data))
    }else{
        logout()
    }
  }


  let contextdata = {
    user:user,
    set: setUser,
    authToken : authTokens,
    setAuthToken: setAuthTokens
  };

  useEffect(() => {
    let fiftyMinutes = 1000 * 60 * 50
    let interval = setInterval(()=>{
        if(authTokens){
            updateToken()
        }
    },fiftyMinutes)
  
    return () => clearInterval(interval)
    
  }, [authTokens, loading])
  

  return (
    <AuthContext.Provider value={contextdata}>
      {children}
    </AuthContext.Provider>
  );
}
