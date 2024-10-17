// src/redux/tasks/taskReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskState } from "../types/types";
import { addTask, updateTaskStatus } from "../action/action";

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload); // Add the new task to the state
      })
      .addCase(
        updateTaskStatus.fulfilled,
        (state, action: PayloadAction<Task>) => {
          // Find the index of the updated task
          const index = state.tasks.findIndex(
            (task) => task.id === action.payload.id
          );
          if (index !== -1) {
            state.tasks[index] = action.payload; // Update the task in the state
          }
        }
      );
  },
});

export default taskSlice.reducer;
