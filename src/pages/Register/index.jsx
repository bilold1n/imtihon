import React, { useState } from "react";
import { auth } from "../../firebasy/firebasyConfig";
// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../apps/userslice";
import { updateProfile } from "firebase/auth";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Login from "../login";
export default function Register() {
  const dispatch = useDispatch();
  // const registergoogle = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       // IdP data available using getAdditionalUserInfo(result)
  //       // ...
  //       console.log(user);
  //       dispatch(login(user));
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //       console.log(errorMessage);
  //     });
  // };
  const [net, setnet] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const [malumot, setmalumot] = useState({
    username: "",
    images: "",
  });
  const userw = "";
  const navigate = useNavigate();
  const hendlesubmit = (e) => {
    e.preventDefault();
    console.log(data.email, data.password);
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(auth.currentUser, {
          displayName: malumot.username,
          photoURL: malumot.images,
        })
          .then(() => {
            dispatch(login(auth.currentUser.providerData[0]));
            navigate("/");
          })
          .catch((error) => {
            alert(error);
          })
          .finally(() =>
            localStorage.setItem(
              "user",
              JSON.stringify(auth.currentUser.providerData[0])
            )
          );
        navigate("/");
        const data = JSON.parse(localStorage.getItem("users")) ?? [];
        localStorage.setItem("users", JSON.stringify([...data, user]));
        localStorage.setItem("user", JSON.stringify(user));
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
          <p className=" w-[400px]"></p>

          <div className="card shrink-0 w-full max-w-sm shadow-2xl ">
            <form onSubmit={hendlesubmit} className="card-body">
              <h2 className="text-5xl font-serif text-[#394E6A] text-center mb-4 ">
                Register!
              </h2>
              <div className="form-control">
                <span className="my-2">Username</span>

                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <input
                    type="text"
                    className="grow  "
                    required
                    placeholder="Enter your Name"
                    onChange={(e) => {
                      setmalumot((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }));
                    }}
                    value={malumot.username}
                  />
                </label>
                <span className="my-2"> Avatar</span>
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <input
                    type="url"
                    placeholder="Enter your Images"
                    className="grow"
                    required
                    onChange={(e) => {
                      setmalumot((prev) => ({
                        ...prev,
                        images: e.target.value,
                      }));
                    }}
                    value={malumot.images}
                  />
                </label>
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
                    required
                    placeholder="Enter your Email"
                    onChange={(e) => {
                      setdata((prev) => ({ ...prev, email: e.target.value }));
                    }}
                    value={data.email}
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
                    required
                    onChange={(e) => {
                      setdata((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }));
                    }}
                    value={data.password}
                  />
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign up</button>
              </div>
              <p className="text-center mt-1" style={{ color: "black" }}>
                Already a member?{" "}
                <Link
                  style={{ textDecoration: "none", color: "blue" }}
                  to={"/login"}
                  type="submit"
                >
                  Sign in
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
