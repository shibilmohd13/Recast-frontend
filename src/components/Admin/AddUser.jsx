import React, { useContext, useState, useEffect } from "react";
import { BsTranslate } from "react-icons/bs";
import axios from "axios";
import baseUrl from "../../constants/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import AuthContext from "../../context/AuthProvider";
import { jwtDecode } from "jwt-decode";
import Navbar from "../Navbar/Navbar";


function AddUser() {
    const navigate = useNavigate()

    const [firstname, setFirstname] = useState("");
    const [Lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpass, setConfirmpass] = useState("");
  
    const [errorfirstname, seterrorFirstname] = useState(false);
    const [errorlastname, seterrorLastname] = useState(false);
    const [erroremail, seterrorEmail] = useState(false);
    const [errorpassword, seterrorPassword] = useState(false);
    const [errorconfirmpass, seterrorConfirmpass] = useState(false);
    const [formerror, setformerror] = useState(false);

    const { loading, userInfo,userToken, error, success, loginErr,isSuperuser } = useSelector((state) => state.auth )


    useEffect(() => {
      if(!isSuperuser){
        navigate("/")
      }
    }, []);


    function handleSignup(e) {
        e.preventDefault();
        if (confirmpass != password) {
          seterrorConfirmpass(true);
        } else {
          seterrorConfirmpass(false);
    
          if (
            errorfirstname ||
            errorlastname ||
            erroremail ||
            errorpassword ||
            errorconfirmpass ||
            firstname == "" ||
            Lastname == "" ||
            email == "" ||
            password == ""
          ) {
            setformerror(true);
            return;
          } else {
            createuser();
          }
        }
      }

      const data = {
        first_name: firstname,
        last_name: Lastname,
        email: email,
        password: password,
      };
    
    
      const createuser = async () => {
        console.log(data);
        await axios
          .post(`${baseUrl}api/users/register/`, data, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            toast.success("User Created successfully");
            setFirstname("");
            setLastname("");
            setEmail("");
            setPassword("");
            setConfirmpass("");
            console.log("create")
            navigate(-1)
          })
          .catch((err) => {
            toast.error("Error in creation");
            console.log("err")

          });
      };
    
      function handleFirstname(e) {
        const val = e.target.value;
        setFirstname(val);
        const regex = /^[a-zA-Z]+(?: [a-zA-Z]+)?$/;
        seterrorFirstname(!regex.test(val));
        setformerror(false);
      }
      function handleLastname(e) {
        const val = e.target.value;
        setLastname(val);
        const regex = /^[a-zA-Z]+(?: [a-zA-Z]+)?$/;
        seterrorLastname(!regex.test(val));
        setformerror(false);
      }
      function handleEmail(e) {
        const val = e.target.value;
        setEmail(val);
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        seterrorEmail(!regex.test(val));
        setformerror(false);
      }
      function handlePassword(e) {
        const val = e.target.value;
        setPassword(val);
        const regex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
        seterrorPassword(!regex.test(val));
        setformerror(false);
      }
    
      function handleConfirmpass(e) {
        const val = e.target.value;
        setConfirmpass(val);
        seterrorConfirmpass(false);
        setformerror(false);
      }

      
  return (
    <>
          <Navbar admin={true} />

    <div className="signup w-full h-svh bg-slate-200  flex justify-center items-center">
          <div className="signup-form">
            <div className="md:hidden flex items-center gap-1  justify-center ">
              <BsTranslate size={25} />
              <div className="text-3xl font-extrabold font-mono">
                <span className="text-blue-800">RE</span>CAST
              </div>
              <br />
              <br />
              <br />
            </div>
            <h1 className="text-blue-800 font-bold text-2xl ">Add User</h1>
            <br />
            <div>
              <form onSubmit={handleSignup}>
                <label
                  htmlFor="inputname"
                  className="block text-gray-800 font-semibold text-sm"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first_name"
                    value={firstname}
                    onChange={handleFirstname}
                    className={`block w-72 rounded-md py-2 px-2 ring-1 ring-inset ring-gray-400 text-sm focus:text-gray-800 focus:outline-1  ${
                      errorfirstname ? " outline-red-600" : ""
                    } `}
                    placeholder="Enter first name"
                  />
                </div>
                <label className="pt-1 block text-red-500 text-xs mb-1">
                  {errorfirstname ? (
                    <span>First name only contains letters</span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </label>
                <label
                  htmlFor="inputname"
                  className="block text-gray-800 font-semibold text-sm"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last_name"
                    value={Lastname}
                    onChange={handleLastname}
                    className={`block w-72 rounded-md py-2 px-2 ring-1 ring-inset ring-gray-400 text-sm focus:text-gray-800 focus:outline-1  ${
                      errorlastname ? " outline-red-600" : ""
                    } `}
                    placeholder="Enter last name"
                  />
                </div>
                <label className="pt-1 block text-red-500 text-xs mb-1">
                  {errorlastname ? (
                    <span>Last name only contains letters</span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </label>

                <label
                  htmlFor="inputname"
                  className="block text-gray-800 font-semibold text-sm"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                    placeholder="Enter email"
                    className={`block w-72 rounded-md py-2 px-2 ring-1 ring-inset ring-gray-400 text-sm focus:text-gray-800 focus:outline-1  ${
                      erroremail ? " outline-red-600" : ""
                    } `}
                  />
                </div>
                <label className="pt-1 block text-red-500 text-xs mb-1">
                  {erroremail ? (
                    <span>Enter a valid Email format</span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </label>
                <label
                  htmlFor="inputname"
                  className="block text-gray-800 font-semibold text-sm"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="inputname"
                    value={password}
                    onChange={handlePassword}
                    placeholder="Enter password"
                    autoComplete="new-password"
                    className={`block w-72 rounded-md py-2 px-2 ring-1 ring-inset ring-gray-400 text-sm focus:text-gray-800 focus:outline-1  ${
                      errorpassword ? " outline-red-600" : ""
                    } `}
                  />
                </div>
                <label className="pt-1 block text-red-500 text-xs mb-1">
                  {" "}
                  {errorpassword ? (
                    <span>Enter Strong password</span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </label>
                <label
                  htmlFor="inputname"
                  className="block text-gray-800 font-semibold text-sm"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="inputname"
                    value={confirmpass}
                    onChange={handleConfirmpass}
                    placeholder="Re-enter password"
                    autoComplete="new-password"
                    className={`block w-72 rounded-md py-2 px-2 ring-1 ring-inset ring-gray-400 text-sm focus:text-gray-800 focus:outline-1  ${
                      errorconfirmpass ? " outline-red-600" : ""
                    } `}
                  />
                </div>
                <label className="pt-1 block text-red-500 text-xs">
                  {formerror ? (
                    <span> Fields cannot be empty </span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                  {errorconfirmpass ? (
                    <span> Password does not match </span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </label>
                <button className="w-72 rounded text-white py-1 bg-blue-800 mt-5 hover:bg-[rgb(0,0,150)] hover:transition-colors hover:shadow-md">
                  Create
                </button>

              </form>
            </div>
          </div>
        </div>
</>
  )
}

export default AddUser