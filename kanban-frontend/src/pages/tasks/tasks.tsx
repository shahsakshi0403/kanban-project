import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Modal,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../redux/hooks";
import { addTask, getTasks, updateTaskStatus } from "./action/action";
import { Task } from "./types/types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import { logout } from "../login/action/action";

const statuses = ["open", "inProgress", "review", "done"];

const TaskPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [taskData, setTaskData] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res: any = await dispatch(getTasks());
    if (!res.error) {
      setTaskData(res.payload);
    }
  };

  const organizedTasks = statuses.reduce((acc, status) => {
    acc[status] = taskData.filter((task) => task.status === status);
    return acc;
  }, {} as Record<string, any[]>);

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return; // If dropped outside a droppable area, exit

    const { source, destination } = result;

    // If the task is dropped in the same column
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const taskId =
      organizedTasks[statuses[source.droppableId]][source.index].id; // Get the task ID
    const newStatus = statuses[destination.droppableId]; // Get new status

    // Update the task status via API call
    await updateStatus(taskId, newStatus);

    // Update local state instead of refetching
    setTaskData((prev: any) => {
      const newData = prev.map((task: any) => {
        if (task.id === taskId) {
          return { ...task, status: newStatus }; // Update the status
        }
        return task;
      });
      return newData; // Return the updated task data
    });
  };

  const updateStatus = async (taskId: number, newStatus: string) => {
    const payload = { status: newStatus };

    // Call your API to update the task status
    await dispatch(updateTaskStatus({ taskId, payload }));
  };

  const handleLogout = async () => {
    const res: any = await dispatch(logout()); // Call your logout action
    if (!res.error) {
      // Handle successful logout (e.g., redirect to login page)
      console.log("Logged out successfully");
      localStorage.clear();
      navigate("/");
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      const res: any = await dispatch(addTask(values));

      if (!res.error) {
        setIsModelOpen(false);
        fetchTasks();
      } else {
        setIsError(true);
      }
    },
  });

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Task Details
      </Typography>
      <Button variant="contained" onClick={() => setIsModelOpen(true)}>
        Add Task
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        sx={{ ml: 2 }}
      >
        Logout
      </Button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {statuses.map((status, index) => (
            <Grid item xs={3} key={status}>
              <Droppable droppableId={index.toString()}>
                {(provided) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{
                      bgcolor: "#f0f0f0",
                      borderRadius: 1,
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: 1,
                      height: "100%",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Typography>
                    <hr />
                    <Box sx={{ flexGrow: 1 }}>
                      {organizedTasks[status].length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                          No tasks
                        </Typography>
                      ) : (
                        organizedTasks[status].map((task, taskIndex) => (
                          <Draggable
                            key={task.id}
                            draggableId={String(task.id)}
                            index={taskIndex}
                          >
                            {(provided) => (
                              <Paper
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                elevation={2}
                                sx={{ mb: 1, p: 2 }}
                              >
                                <Typography variant="subtitle1">
                                  {task.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {task.description}
                                </Typography>
                              </Paper>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </Box>
                  </Box>
                )}
              </Droppable>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>

      <Modal open={isModelOpen} onClose={() => setIsModelOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <h2>Add Task</h2>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              variant="standard"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              variant="standard"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              sx={{ mt: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
            >
              Save Task
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsModelOpen(false)}
              sx={{ mt: 2, ml: 2 }}
            >
              Cancel
            </Button>
          </form>
        </Box>
      </Modal>

      <Snackbar
        open={isError}
        autoHideDuration={6000}
        onClose={() => setIsError(false)}
        message="Something went wrong!"
      />
    </>
  );
};

export default TaskPage;
