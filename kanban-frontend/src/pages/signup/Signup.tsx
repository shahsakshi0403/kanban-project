import { TextField, Button, Box, Snackbar } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../login/action/action";
import { useState } from "react";

const SignupPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isError, setIsError] = useState<boolean>(false);

  // Formik setup for handling signup form
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res: any = await dispatch(registerUser(values));

        if (!res.error) {
          navigate("/");
        } else {
          setIsError(true);
        }
      } catch (error: any) {
        console.error(
          "Registration Failed:",
          error.response?.data || error.message
        );
      }
    },
  });

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
      <h2>Sign Up</h2>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Username"
          variant="outlined"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{ mb: 2 }}
        />

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
          Sign Up
        </Button>
      </form>

      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <p>
          Already have an account?{" "}
          <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
            Login
          </Link>
        </p>
      </div>

      <Snackbar
        open={isError}
        autoHideDuration={6000}
        onClose={() => setIsError(false)}
        message="Something went wrong!"
      />
    </Box>
  );
};

export default SignupPage;
