// authActions.js
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import baseUrl from '../constants/constants'
import { jwtDecode } from 'jwt-decode'




export const registerUser = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    console.log(data)
    try {
        await axios
        .post(`${baseUrl}api/users/register/`, data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)


export const userLogin = createAsyncThunk(
    'auth/login',
    async (logindata, { rejectWithValue }) => {
      try {
        const { data } = await axios
        .post(`${baseUrl}api/token/`, logindata, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        localStorage.setItem('authTokens', JSON.stringify(data))
        localStorage.setItem('userInfo', JSON.stringify(jwtDecode(data.access)))

        return data
      } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )

