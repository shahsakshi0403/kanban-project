// import styles from "./login.module.css";

import { GoogleLogin } from "@react-oauth/google";
import TaskPage from "../tasks/tasks";

const LoginPage = () => {
  //   const googleAuth = () => {
  //     window.open(
  //       `http://localhost:8080/auth/google/callback`,
  //       "_self"
  //     );
  //   };

  const responseMessage = (response: any) => {
    console.log(response);
  };
  const errorMessage = (error: any) => {
    console.log(error);
  };

  return (
    <div style={{ width: "50%" }}>
      <p>Hello React</p>
      <GoogleLogin onSuccess={responseMessage} onError={() => errorMessage} />
    </div>
  );
};

export default LoginPage;
