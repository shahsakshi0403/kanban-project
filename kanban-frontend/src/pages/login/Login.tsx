import { GoogleLogin } from "@react-oauth/google";
import { TextField, Button, Box, Snackbar } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "./action/action";
import { Login } from "./types/types";
import { useAppDispatch } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getTasks } from "../tasks/action/action";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isError, setIsError] = useState<boolean>(false);

  // Formik setup for handling email and password form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values: Login) => {
      try {
        const res: any = await dispatch(loginUser(values));

        //navigate to task page
        if (!res.error) {
          await dispatch(getTasks());
          navigate("/tasks");
        } else {
          setIsError(true);
        }
      } catch (error: any) {
        console.error("Login Failed:", error.response?.data || error.message);
      }
    },
  });

  const responseMessage = (response: any) => {
    console.log("Google OAuth Success:", response);
  };

  const errorMessage = (error: any) => {
    console.error("Google OAuth Error:", error);
  };

  return (
    <Box
      sx={{
        width: "400px",
        padding: "2rem",
        boxShadow: 3,
        bgcolor: "background.paper",
        borderRadius: "8px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <h2>Login</h2>
      {/* Formik form for email and password */}
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ width: "100%" }}
        >
          Login
        </Button>
      </form>

      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <p>
          Don't have an account?. Create new one{" "}
          <Link
            to="/signup"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Register
          </Link>
        </p>
      </div>

      <p>OR</p>
      <GoogleLogin onSuccess={responseMessage} onError={() => errorMessage} />

      <Snackbar
        open={isError}
        autoHideDuration={6000}
        onClose={() => setIsError(false)}
        message="Something went wrong!"
      />
    </Box>
  );
};

export default LoginPage;
