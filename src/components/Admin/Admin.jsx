import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import baseUrl from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";

function Admin(props) {
  const navigate = useNavigate();

  const [allusers, setallusers] = useState([]);

  const [modal, setModal] = useState(false);
  const [modalitem, setmodalitem] = useState();
  const [modaltype, setmodaltype] = useState();
  const [search, setSearch] = useState('')

  const { loading, userInfo,userToken, error, success, loginErr,isSuperuser } = useSelector((state) => state.auth )

  const getusers = async (searchTerm) => {
    await axios
      .get(`${baseUrl}api/users/users_list/`,{params: {
        search: searchTerm, // Add your query parameters here
      }})
      .then((res) => {
        console.log(res.data);
        setallusers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if(!isSuperuser){
      navigate("/")
    }
    getusers(search);
  }, [modal,search]);

  const handleBlockmodal = (item) => {
    setmodaltype(false);
    setmodalitem(item);
    setModal(true);
  };
  const handleDeletemodal = (item) => {
    setmodaltype(true);
    setmodalitem(item);
    setModal(true);
  };

  return (
    <>
      <Navbar admin={props.admin} />
      <div className="container w-svw m-auto ">
        <div className="">
          <div className=" h-6  "></div>
          <div className=" flex justify-center">
            <div className="bg-white w-full md:w-[80%] rounded border-[1px] border-slate-300 shadow-lg p-8 lg:p-16 ">
              <div className="flex max-sm:flex-col justify-between items-center">
                <div className="text-blue-900 font-bold text-3xl mb-5">
                  Manage Users
                </div>
                <div className="flex mt-2 gap-3 items-center mb-6 ">
                  <form className="flex items-center border-[2px] border-blue-900 rounded">
                    <input
                      type="text"
                      name="search"
                      placeholder="Search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="block  sm:w-52 w-32 rounded-md py-2 px-2 text-sm focus:outline-none "
                    />
                    <button className="m-1 p-2 rounded bg-blue-900 text-white"><BsSearch/></button>
                  </form>
                  
                  <button
                    onClick={() => navigate("/add_user")}
                    className="w-32  rounded flex justify-center text-white py-1 bg-blue-800 hover:bg-[rgb(0,0,150)] hover:transition-colors hover:shadow-md"
                  >
                    Add User
                  </button>
                </div>
              </div>

              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        First name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Last name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      {/* <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Block</span>
                      </th> */}
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        <span className="sr-only">Delete</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    
                    {allusers.map((item, index) => (
                      <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="px-6 py-4">{item.first_name}</td>
                        <td className="px-6 py-4">{item.last_name}</td>
                        <td className="px-6 py-4">{item.email}</td>

                        {/* <td className="px-6 py-4 text-right">
                                                        <span onClick={()=>handleBlockmodal(item)} href="#" className="font-medium text-red-600 dark:text-blue-500 hover:underline hover:cursor-pointer">Block</span>
                                                    </td> */}
                        <td className="px-6 py-4 text-right">
                          <span
                            onClick={() =>
                              navigate("/edit_user", { state: { id: item.id } })
                            }
                            href="#"
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline hover:cursor-pointer"
                          >
                            Edit
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span
                            onClick={() => handleDeletemodal(item)}
                            className="font-medium  text-red-600 dark:text-red-600 hover:underline hover:cursor-pointer"
                          >
                            Delete
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {allusers.length == 0 && <div className="w-full text-center text-blue-900 text-xl font-semibold my-5">No users</div>}

              </div>
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <Modal
          modaltype={modaltype}
          modalitem={modalitem}
          setModal={setModal}
        />
      )}
    </>
  );
}

export default Admin;
