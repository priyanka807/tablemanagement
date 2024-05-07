import { Link } from "react-router-dom";
import "./Loginpage.css";
import { useFormik} from "formik";
import React from "react";
import { loginSchemas } from "../schemas/main";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import auth from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, seterrMsg] = useState("");
  const [getEmail, setGetEmail] = useState("");

  useEffect(() => {
    if (getEmail !== "") {
      localStorage.setItem("Email", JSON.stringify(getEmail));
      navigate("/tablecontent");
    }
  }, [getEmail, navigate]);

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues: initialValues,

      validationSchema: loginSchemas,

      onSubmit: (values) => {
        signInWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
            const user = userCredential.user;
            const userEmail = user.email;

            setGetEmail(userEmail);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            seterrMsg(errorMessage);
          });
      },
    });

  const notify = () =>
    toast(
      "pls fill your valid email and correct password & see my awesome website"
    );

  return (
    <>
      <div className="form-container">
        <div className={`form-content ${isSubmitted ? "custom-class" : ""}`}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                autoComplete="off"
                className="form-control"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.email && errors.email ? (
                <h6
                  className="form-error  errors"
                  onClick={() => setIsSubmitted(true)}
                >
                  {errors.email}
                </h6>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                autoComplete="off"
                className="form-control"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password ? (
                <h6
                  className="form-error  errors"
                  onClick={() => setIsSubmitted(true)}
                >
                  {errors.password}
                </h6>
              ) : null}
            </div>
            <button
              type="submit"
              className="continue"
              onClick={() => setIsSubmitted(true)}
            >
              {" "}
              Continue
            </button>

            <button className="signup">
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "blue" }}
              >
                signup
              </Link>
            </button>
            <h5>or Connect with Social Media</h5>
            <button className="twitter">
              {" "}
              <i
                className="fa-brands fa-twitter"
                style={{paddingRight:'5px',color:'white' }}
              ></i>{" "}
              <Link
                to="https://twitter.com"
                style={{ textDecoration: "none", color: "white" }}
              >
                Sign in with Twitter
              </Link>{" "}
            </button>
            <button className="facebook">
              {" "}
              <i className="fa-brands fa-facebook" style={{ color: "white",paddingRight:'5px' }}>
                {" "}
              </i>{" "}
              Sign in with Facebook
            </button>
            {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
