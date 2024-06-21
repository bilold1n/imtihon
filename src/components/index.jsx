import React, { useEffect, useState } from "react";
import { auth } from "../firebasy/firebasyConfig";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import cartslice from "../apps/cartslice";
import { signOut } from "firebase/auth";

export default function Header() {
  const { cart } = useSelector((state) => state.cart);

  const dispach = useDispatch();

  const navigate = useNavigate();
  const { users } = useSelector((state) => state.user);
  const logoutt = () => {
    signOut(auth)
      .then(() => {
        alert("Siz muvoffaqiyatli chiqingiz");
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const [modal, setmodal] = useState(false);
  const [theme, settheme] = useState("light");
  console.log(theme);

  const handletheme = (value) => {
    localStorage.setItem("theme", value);
    const themee = localStorage.getItem("theme");
    document.getElementById("root").setAttribute("data-theme", themee);
  };
  const onmodal = () => {
    setmodal(true), document.getElementById("my_modal_1").showModal();
  };

  return (
    <>
      <div
        className="navbar bg-primary-content
"
      >
        <div className=" navbar container">
          <div className="flex-1 ">
            <Link to={"/"} className="btn btn-primary w-[50px] h-[50px]">
              C
            </Link>
          </div>
          <ul className="menu menu-horizontal  flex-auto gap-2">
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/product"}>Products</NavLink>
            </li>
            <li>
              <NavLink to={"/yourstore"}>Cart</NavLink>
            </li>
          </ul>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
              Theme
              <svg
                width="12px"
                height="12px"
                className="h-2 w-2 fill-current opacity-60 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048"
              >
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
              </svg>
            </div>
            <ul
              onClick={(e) => {
                handletheme(e.target.value);
              }}
              tabIndex={0}
              className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52"
            >
              <li>
                <input
                  checked
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Default"
                  value="light"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Night"
                  value="night"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Retro"
                  value="retro"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Synthwave"
                  value="synthwave"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Cyberpunk"
                  value="cyberpunk"
                />
              </li>
              <li>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label="Valentine"
                  value="valentine"
                />
              </li>
            </ul>
          </div>
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">
                    {cart.length}
                  </span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
              >
                <div className="card-body">
                  <span className="font-bold text-lg">
                    {cart.length} product
                  </span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <Link
                      to={"/yourstore"}
                      className="btn btn-primary btn-block"
                    >
                      View cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={users?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a
                    onClick={() => {
                      onmodal();
                    }}
                    className="justify-between"
                  >
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={() => logoutt()}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <div className="flex flex-col items-center">
            <img width={50} src={users?.photoURL} alt="" />
            <p className="py-4">Name: {users?.displayName}</p>
            <p className="py-4">Email: {users?.email}</p>
          </div>
        </div>
      </dialog>
    </>
  );
}
