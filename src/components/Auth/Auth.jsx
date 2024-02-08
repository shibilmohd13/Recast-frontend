import React, { useContext, useState,useEffect } from "react";
import { BsTranslate } from "react-icons/bs";
import axios from "axios";
import baseUrl from "../../constants/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import AuthContext from "../../context/AuthProvider";
import { jwtDecode } from "jwt-decode";
import { registerUser, userLogin } from "../../features/authActions";



function Auth() {
  const [login, setLogin] = useState(true);
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

  const [loginemail, setloginemail] = useState("");
  const [loginpassword, setloginpassword] = useState("");
  const [loginerror, setloginerror] = useState("");

  const dispatch = useDispatch();

  const { loading, userInfo, error, success, loginErr } = useSelector(
    (state) => state.auth
  )

  // const {user, set, authToken, setAuthToken}= useContext(AuthContext)

  const data = {
    first_name: firstname,
    last_name: Lastname,
    email: email,
    password: password,
  };

  const logindata = {
    email: loginemail,
    password: loginpassword,
  };

  async function handleLogin(e) {
    e.preventDefault();
    if (loginpassword == "" || loginemail == "") {
      setloginerror("Please enter the credentials");
      return;
    }
    dispatch(userLogin(logindata))

  }

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
        try{dispatch(registerUser(data))}
        catch{
          setloginerror("Invalid Email or Password")
        }

      }
    }
  }

    // useEffect to show Toastify notification after creating a user
    useEffect(() => {
      if (success) {
        toast.success("User Created successfully");
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setConfirmpass("");
        setLogin(true);
      }
      if (error) {
        toast.error("Error in creation");
      }

    }, [success, error]);

    useEffect(() => {
      if (userInfo) {
        navigate('/home')
      }
      if(loginErr){
          setloginerror("Invalid Email or Password")
      }
      else{
        setloginerror(null)
      }

    }, [loginErr,userInfo])


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
    <div className="main flex">
      <div className="max-md:hidden cover-image w-[60%] h-svh bg-white flex justify-center items-center gap-6">
        <BsTranslate size={100} />
        <div className="flex flex-col">
          <span className="text-8xl font-extrabold font-mono">
            <span className="text-blue-800">RE</span>CAST
          </span>
          <span className="text-sm font-light  text-slate-600">
            Empowering Understanding, Enriching Conversations
          </span>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {login ? (
        <div className="login max-md:w-full w-[40%]   h-svh bg-slate-200  flex justify-center items-center">
          <div className="login-form">
            <div className="md:hidden flex items-center gap-1  justify-center ">
              <BsTranslate size={25} />
              <div className="text-3xl font-extrabold font-mono">
                <span className="text-blue-800">RE</span>CAST
              </div>
              <br />
              <br />
              <br />
            </div>
            <h1 className="text-blue-800 font-bold text-2xl ">Login</h1>
            <span className="text-xs font-light  text-slate-600">
              Login for a Personalized Experience!
            </span>
            <br />
            <br />
            <div>
              <form onSubmit={handleLogin}>
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
                    value={loginemail}
                    onChange={(e) => {
                      setloginemail(e.target.value);
                      setloginerror("");
                    }}
                    placeholder="Enter email"
                    className="block w-72 rounded-md py-2 px-2 ring-1 ring-inset ring-gray-400 text-sm focus:text-gray-800 focus:outline-1 focus:outline-blue-900 "
                  />
                </div>
                <label className="pt-1 block text-gray-500 text-xs">
                  &nbsp;
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
                    value={loginpassword}
                    onChange={(e) => {
                      setloginpassword(e.target.value);
                      setloginerror("");
                    }}
                    placeholder="Enter password"
                    className="block w-72 rounded-md py-2 px-2 ring-1 ring-inset ring-gray-400 text-sm focus:text-gray-800 focus:outline-1 focus:outline-blue-900 "
                    autoComplete="new-password"
                  />
                </div>
                <label className="pt-1 block text-red-500 text-xs">
                  {loginerror != "" ? (
                    <span>{loginerror}</span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                </label>
                <button className="w-72 rounded text-white py-1 bg-blue-800 mt-5 hover:bg-[rgb(0,0,150)] hover:transition-colors hover:shadow-md">
                  Signin
                </button>
                <br />
                <br />
                <div
                  className="text-center text-xs hover:underline hover:cursor-pointer text-blue-800 font-semibold"
                  onClick={() => setLogin(false)}
                >
                  Create Account
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="signup max-md:w-full w-[40%] h-svh bg-slate-200  flex justify-center items-center">
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
            <h1 className="text-blue-800 font-bold text-2xl ">Signup</h1>
            <span className="text-xs font-light  text-slate-600">
              {" "}
              Start Your Adventure by Creating Your Account{" "}
            </span>
            <br />
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
                <br />
                <br />
                <div
                  className="text-center text-xs hover:underline hover:cursor-pointer text-blue-800 font-semibold"
                  onClick={() => setLogin(!login)}
                >
                  Login to account
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Auth;
