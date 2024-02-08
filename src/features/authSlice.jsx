import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authActions";
import { jwtDecode } from "jwt-decode";

const loadInitialState = () => {
  const storedState = localStorage.getItem("authState");
  return storedState ? JSON.parse(storedState) : initialState;
};

const initialState = {
  loading: false,
  userInfo: null, 
  userToken: null, 
  error: null,
  success: false, 
  loginErr: false,
  isSuperuser:false
};

const authSlice = createSlice({
  name: "auth",
  initialState:loadInitialState(),
  reducers:{ logoutUser: (state) => {
    
    localStorage.removeItem("authState");
    return initialState;
  },},
  extraReducers: (builder) => {
   
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; 
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(userLogin.pending, (state) =>{
        state.loading = true
        state.loginErr = false
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loginErr = true;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        const data = JSON.parse(localStorage.getItem("authTokens"))
        state.userInfo = jwtDecode(data.access);
        state.userToken = data
        state.isSuperuser = jwtDecode(data.access).isSuperuser
        localStorage.setItem("authState", JSON.stringify(state));
      });
  },
});

export const {logoutUser} = authSlice.actions

export default authSlice.reducer;
