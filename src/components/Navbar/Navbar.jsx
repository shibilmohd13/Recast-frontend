import React, { useContext, useEffect, useState } from "react";
import { BsTranslate } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaUser, FaHome } from "react-icons/fa";
import { MdOutlineLogout,MdAdminPanelSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/authSlice";


function Navbar(props) {

  const [dropdown, setdropdown] = useState(false);

  const { loading, userInfo,userToken, error, success, loginErr,isSuperuser } = useSelector(
    (state) => state.auth
  )
  const [user, setUser] = useState('')
  const dispatch = useDispatch()

  const navigate = useNavigate()

   const logout = () => {
    localStorage.removeItem("authTokens");
    localStorage.removeItem("userInfo");
    dispatch(logoutUser())
    navigate('/')
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")));
    
  }, []);
  
  console.log(userInfo)
  console.log(`User = ${userInfo}`)

  return (
    <div className="bg-white">
      <div className="container h-16 w-svw mx-auto flex justify-between items-center gap-1">
        <div className="logo flex items-center gap-2 pl-6">
          <BsTranslate size={25} />
          <div className="md:text-3xl text-lg  font-extrabold font-mono">
            <span className="text-blue-800">RE</span>CAST
            {props.admin ? <span className="ml-[5px]">ADMIN</span> : ""}
          </div>
        </div>
        <div
          className="profile-section flex rounded items-center gap-2 py-2 px-4 mr-5 hover:bg-slate-50 hover:transition-colors  hover:cursor-pointer"
          onClick={() => setdropdown(!dropdown)}
        >
          <FaChevronDown size={16} />
          <FaUserCircle size={30} />
          {console.log(userInfo)}
          <span className="max-md:hidden font-semibold ">{user?user.first_name:"User"}</span>
        </div>
        {dropdown && (
          <div className="absolute w-40 bg-white  rounded shadow-lg top-16 lg:right-16 right-1">
            <div onClick={()=>navigate('/home')} className="profile flex gap-2 items-center py-2 px-4 hover:bg-slate-50 hover:cursor-pointer">
              <FaHome />
              <span>Home</span>
            </div>
            <div onClick={()=>navigate('/profile')} className="profile flex gap-2 items-center py-2 px-4 hover:bg-slate-50 hover:cursor-pointer">
              <FaUser />
              <span>User Profile</span>
            </div>
            {isSuperuser &&(<div onClick={()=>navigate('/admin')} className="profile flex gap-2 items-center py-2 px-4 hover:bg-slate-50 hover:cursor-pointer">
              <MdAdminPanelSettings />
              <span>Admin Panel</span>
            </div>)}
            <div onClick={logout} className="logout flex gap-2 items-center py-2 px-4 hover:bg-slate-50 hover:cursor-pointer" >
              <MdOutlineLogout />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
Navbar.defaultProps = {
  admin: false,
};

export default Navbar;
