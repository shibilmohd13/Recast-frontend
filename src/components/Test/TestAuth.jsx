import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../constants/constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TestAuth() {

  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");


  const data = {
    first_name,
    last_name,
    email,
    password,
  };
  const hi = () => {
    const fetch = async () => {
      await axios
        .post(`${baseUrl}api/users/register/`, data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res.data);
          console.log(res.status);
          console.log(res.statusText);
          console.log(res.headers);
          toast.success('User Created successfully');

        })
        .catch((err) => {
          toast.error('User not created');
          console.log(err)
          console.log(er)
        });
    };
    fetch();
  };

  return (
    <>
      <div>TestAuth</div>
      <input type="text" className="border-[1px] mb-1 rounded border-slate-300" placeholder="enter first name" value={first_name} onChange={(e) => setfirst_name(e.target.value)} />
      <input type="text" clas
      
      
      
      
      
       sName="border-[1px] mb-1 rounded border-slate-300" placeholder="enter last name" value={last_name} onChange={(e) => setlast_name(e.target.value)} />
      <input type="text" className="border-[1px] mb-1 rounded border-slate-300" placeholder="enter email" value={email} onChange={(e) => setemail(e.target.value)} />
      <input type="text" className="border-[1px] mb-1 rounded border-slate-300" placeholder="enter pass" value={password} onChange={(e) => setpassword(e.target.value)} />

      <div>{first_name}</div>
      <div>{last_name}</div>
      <div>{email}</div>
      <div>{password}</div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
/>
      {/* Same as */}
      <ToastContainer />


      <div onClick={hi} className="bg-blue-900 text-white rounded px-3 py-1 mt-4">Create</div>
    </>
  );
}

export default TestAuth;
