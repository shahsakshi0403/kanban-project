// src/redux/auth/authActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN, LOGOUT, REGISTER } from "../../../constants/constant";
import { Login, Register } from "../types/types";

// Retrieve token from local storage
const token = localStorage.getItem("token");

// Async thunk for login API call
export const loginUser = createAsyncThunk(
  LOGIN,
  async (data: Login, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        data
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async thunk for register API call
export const registerUser = createAsyncThunk(
  REGISTER,
  async (data: Register, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        data
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Define the logout action
export const logout = createAsyncThunk(LOGOUT, async () => {
  // Make API call to logout
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/auth/logout`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header
      },
    }
  );

  // Check response validity
  if (response.status !== 200) {
    throw new Error("Logout failed");
  }

  return {}; // You can return any value if needed
});
