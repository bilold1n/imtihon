import React, { useState } from "react";
import { auth } from "../../firebasy/firebasyConfig";
// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../apps/userslice";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default function Login() {
  const dispatch = useDispatch();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const [malumot, setmalumot] = useState({
    username: "",
  });
  const navigate = useNavigate();
  const hendlesubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(login(auth.currentUser.providerData[0]));

        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  return (
    <>
      <div data-theme="light" className="hero min-h-screen ">
        <div className="hero-content flex-col ">
          <div className="text-center   ">
            {" "}
            <p className="py-6 w-[400px]"></p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={hendlesubmit} className="card-body">
              <div className="form-control">
                <h1 className="text-[#394E6A] text-5xl text-center">Login</h1>
                <span className="my-2">Email</span>

                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow "
                    placeholder="Enter your Email"
                    onChange={(e) => {
                      setdata((prev) => ({ ...prev, email: e.target.value }));
                    }}
                    value={data.email}
                    required
                  />
                </label>
              </div>
              <div className="form-control">
                <span className="my-2">Password</span>
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="password"
                    placeholder="Enter your Password"
                    className="grow"
                    onChange={(e) => {
                      setdata((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }));
                    }}
                    value={data.password}
                    required
                  />
                </label>
              </div>
              <div className="form-control mt-6 gap-4">
                <button className="btn btn-primary">Sign in</button>
                <button className="btn text-white bg-[#463AA1]">
                  Guest user
                </button>
              </div>
              <p className="text-center mt-4" style={{ color: "black" }}>
                {" "}
                Not a member yet?{" "}
                <Link
                  style={{ textDecoration: "none", color: "blue" }}
                  to={"/signup"}
                  type="submit"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* <div className="min-h-screen grid place-items-center">
        <button onClick={registergoogle} className="btn btn-primary">
          google
        </button>
      </div> */}
    </>
  );
}
