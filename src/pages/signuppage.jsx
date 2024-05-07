import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

import { signupSchemas } from "../schemas/yupForsignup";
import "./signup.css";
import auth from "./firebase";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};
const SignupPage = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, seterrMsg] = useState("");
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    handleReset,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: signupSchemas,
    onSubmit: (values) => {
      createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
        values.confirm_password
      )
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrMsg(errorMessage)
        });
    },
  });

  return (
    <>
      <div className="form_container_bootstrap ">
        <div className={`col-md-5 ${isSubmitted ? "custom-class" : ""}`}>
          <h1 className="my-4 font-weight-bold .display-4">Sign up</h1>
          <form onSubmit={handleSubmit}>
   
            <div className="mb-3">
              <label htmlFor="email" className="input-label">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                name="email"
                autoComplete="off"
                id="email"
                className="form-control"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.email && errors.email ? (
              <h6
                className="form-error  errors"
                onClick={() => setIsSubmitted(true)}
              >
                {errors.email}
              </h6>
            ) : null}

            <div className="mb-3">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <input
                type="text"
                placeholder="Password"
                name="password"
                autoComplete="off"
                id="password"
                className="form-control"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.password && errors.password ? (
              <h6
                className="form-error  errors"
                onClick={() => setIsSubmitted(true)}
              >
              {errors.password}</h6>
            ) : null}

            <div className="mb-3">
              <label htmlFor="confirm_password" className="">
                Confirm-Password
              </label>
              <input
                type="text"
                placeholder="Confirm Password"
                name="confirm_password"
                autoComplete="off"
                id="confirm_password"
                className="form-control"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.confirm_password && errors.confirm_password ? (
              <h6
                className="form-error errors"
                onClick={() => setIsSubmitted(true)}
              >
                {errors.confirm_password}
              </h6>
            ) : null}
              {errorMsg?<p style={{color:'red'}}>{errorMsg}</p>:null}

            <button
              className="btn btn-dark mt-3"
              type="submit"
              onClick={() => setIsSubmitted(true)}
            >
              Registration
            </button>
            <button
              className="btn btn-danger mt-3 ml-3"
              type="reset"
              onClick={handleReset}
              style={{ marginLeft: "30px" }}
            >
              Reset
            </button>
            <p style={{ marginTop: "10px" }}>
              {" "}
              Already have an account?{" "}
              <Link to="/" style={{ textDecoration: "none" }}>
                login
              </Link>
            </p>

          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
