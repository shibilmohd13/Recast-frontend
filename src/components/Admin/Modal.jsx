import React, { useState } from "react";
import "./Modal.css";
import axios from "axios";
import baseUrl from "../../constants/constants";
import { useNavigate } from "react-router-dom";

function Modal(props) {
  const [type, settype] = useState(props.modaltype ? "DELETE" : "BLOCK");

  const deleteUser = async()=>{
    axios.delete(`${baseUrl}api/users/delete_user/${props.modalitem.id}/`).then(res=>{
        console.log("done")
        props.setModal(false)
    }).catch(err=>{
        console.log("err")
        alert("error in deletion")
    })
  }
  return (
    <div className="modal flex justify-center items-center">
      <div className="w-[80%] md:w-[45%] h-[40%] bg-white rounded-md flex flex-col justify-center items-center">
        <div className="text-2xl font-bold text-blue-900 mb-10">
          ARE YOUR SURE TO {type} {props.modalitem.first_name.toUpperCase()} ?
        </div>
        <div className="buttons flex gap-20">
          <button
            onClick={() => props.setModal(false)}
            className="py-1 px-4 bg-white border-[1px] rounded hover:bg-blue-900 hover:transition-colors hover:text-white border-blue-900"
          >
            Cancel
          </button>
          {props.modaltype ? (
            <button onClick={deleteUser} className="py-1 px-4 bg-red-500 hover:bg-red-700 text-white hover:transition-colors rounded">
              Delete
            </button>
          ) : (
            <button  className="py-1 px-4 bg-red-500 hover:bg-red-700 text-white hover:transition-colors rounded">
              Block
            </button>
          )}

        </div>
      </div>
    </div>
  );
}

export default Modal;
