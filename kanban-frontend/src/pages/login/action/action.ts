// src/redux/auth/authActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGIN, REGISTER } from "../../../constants/constant";
import { Login, Register } from "../types/types";

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
