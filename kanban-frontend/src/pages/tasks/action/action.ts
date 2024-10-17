import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ADD_TASK,
  GET_TASKS,
  UPDATE_STATUS,
} from "../../../constants/constant";
import { Task } from "../types/types";

// Retrieve token from local storage
const token = localStorage.getItem("token");

// Async thunk for fetching tasks
export const getTasks = createAsyncThunk(
  GET_TASKS,
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/task`, // Replace with your actual API endpoint
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header
          },
        }
      );
      return response.data; // Returning the tasks data
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async thunk for adding a new task
export const addTask = createAsyncThunk(
  ADD_TASK,
  async (task: Task, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/task`,
        task,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Action to update task status
export const updateTaskStatus = createAsyncThunk(
  UPDATE_STATUS,
  async (
    { taskId, payload }: { taskId: number; payload: { status: string } },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/task/${taskId}/status`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
