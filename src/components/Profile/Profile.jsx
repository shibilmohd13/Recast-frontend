import React, { useContext, useEffect, useReducer, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import baseUrl from "../../constants/constants";
import AuthContext from "../../context/AuthProvider";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function Profile() {
  const [authToken , setAuthToken] = useState(JSON.parse(localStorage.getItem('authTokens')))

  const [profile, setprofile] = useState([]);

  const [id, setid] = useState("");

  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setemail] = useState("");
  const [profilepicedit, setProfilepicedit] = useState(false);
  const { loading, userInfo, error, success, loginErr } = useSelector(
    (state) => state.auth
  )


  const navigate = useNavigate()

  const getProfile = async () => {
    let response = await fetch(`${baseUrl}api/users/profile/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authToken.access),
      },
    });
    let data = await response.json();
    setprofile(data[0]);
    setid(data[0].user);
    console.log("HIII" + data[0]);
    console.log(data[0]);
    //    console.log(user_details)
  };

  useEffect(() => {
    // console.log(authToken);
    if(!userInfo){
      navigate('/')
    }
    else{
      getProfile();
    const user_details = jwtDecode(authToken.access);
    setfirst_name(user_details.first_name);
    setlast_name(user_details.last_name);
    setemail(user_details.email);
    setProfilepicedit(null);
    }
    
  }, []);

  const updateddata = {
    first_name: first_name,
    last_name: last_name,
    email: email,
  };

  const updateToken = async () => {
    console.log("token updated");
    let refresh_token = JSON.stringify({ refresh: authToken.refresh });
    let response = await fetch(`${baseUrl}api/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: refresh_token,
    });
    let data = await response.json();

    if (response.status == 200) {
      setAuthToken(data);
      set(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      // logout()
      // alert("not");
    }
  };

  const updateUser = async () => {
    await axios
      .put(`${baseUrl}api/users/update_user/${id}/`, updateddata)
      .then((res) => {
        updateToken();
        console.log(res.data);
        setfirst_name(res.data.first_name);
        setlast_name(res.data.last_name);
        setemail(res.data.email);
        toast.success("Updated successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("not updated");
      });
  };

  const updateProfilepic = async (id) => {
    const formData = new FormData();
    formData.append('profile', profilepicedit);
    console.log(profilepicedit)
    await axios.put(`${baseUrl}api/users/update_profile/${id}/`,formData).then(res=>{
        console.log(res.data)
        toast.success("profile pic Updated successfully");

    }).catch(err=>{
        console.log(err)
    })
  }

  return (
    <>
      <Navbar />
      <div className="container w-svw m-auto ">
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
        <div className="">
          <div className=" h-6  "></div>
          <div className=" flex justify-center">
            <div className="bg-white w-full md:w-[80%] rounded border-[1px] border-slate-300 shadow-lg p-20 grid grid-cols-1 lg:grid-cols-2">
              <div className="profilepic flex flex-col items-center justify-center">
                <div className="text-2xl text-blue-900 font-bold mb-4">
                  User Profile
                </div>
                {profilepicedit ? (
                  <img
                    className="w-72 h-72 rounded-full mb-5"
                    src={URL.createObjectURL(profilepicedit)}
                    alt=""
                  />
                ) : (
                  <img
                    className="w-72 h-72 rounded-full mb-5"
                    src={
                      profile.profile
                        ? "http://127.0.0.1:8000" + profile.profile
                        : `./avatar.webp`
                    }
                    alt=""
                  />
                )}

                {/* <div className='w-72 h-72 rounded-full mb-5' style={{ background: `url()`, backgroundSize: 'fit', backgroundPosition: 'center' }}></div> */}
                <div className="grid w-full max-w-xs items-center gap-1.5">
                  <label className="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Profile picture
                  </label>
                  <input
                    id="picture"
                    type="file"
                    onChange={(e)=>setProfilepicedit(e.target.files[0])}
                    className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
                  />
                </div>
                <button onClick={()=>updateProfilepic(profile.id)} className="w-72 rounded flex justify-center text-white py-1 bg-blue-800 mt-5 hover:bg-[rgb(0,0,150)] hover:transition-colors hover:shadow-md">
                  Save Profile Pic
                </button>
              </div>
              <div className="profilepic  flex flex-col justify-center items-center mt-3">
                <label
                  htmlFor="inputname"
                  className="block text-gray-800 font-semibold text-sm"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter first name"
                    value={first_name}
                    onChange={(e) => setfirst_name(e.target.value)}
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
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="inputname"
                    value={last_name}
                    onChange={(e) => setlast_name(e.target.value)}
                    placeholder="Enter last name"
                    className="block w-72 rounded-md py-2 px-2 ring-1 ring-inset ring-gray-400 text-sm focus:text-gray-800 focus:outline-1 focus:outline-blue-900 "
                  />
                </div>
                <label className="pt-1 block text-red-500 text-xs">
                  &nbsp;
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
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className="block w-72 rounded-md py-2 px-2 ring-1 ring-inset ring-gray-400 text-sm focus:text-gray-800 focus:outline-1 focus:outline-blue-900 "
                  />
                </div>
                <label className="pt-1 block text-gray-500 text-xs">
                  &nbsp;
                </label>
                {/* <label
                  htmlFor="inputname"
                  className="block text-gray-800 font-semibold text-sm"
                >
                  API USAGE
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    disabled={true}
                    value={profile.api_usage}
                    className="block w-72 rounded-md py-2 px-2 ring-1 ring-inset ring-gray-400 text-sm focus:text-gray-800 focus:outline-1 focus:outline-blue-900 "
                  />
                </div>
                <label className="pt-1 block text-gray-500 text-xs">
                  &nbsp;
                </label> */}

                <button
                  onClick={updateUser}
                  className="w-72 rounded flex justify-center text-white py-1 bg-blue-800 mt-5 hover:bg-[rgb(0,0,150)] hover:transition-colors hover:shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
