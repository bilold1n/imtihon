import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addtocart,
  decrement,
  deleteitem,
  increment,
} from "../../apps/cartslice";
import { useNavigate } from "react-router-dom";
export default function Mystore() {
  const { cart } = useSelector((state) => state.cart);

  let subtotal = 0;
  cart.forEach((item) => {
    console.log(item.price);
    subtotal += item.price * item.count;
  });
  const dispach = useDispatch();

  const shipping = 5;
  const tax = 115;
  const orderTotal = subtotal + shipping + tax;
  console.log(subtotal);
  const navigate = useNavigate();
  return (
    <div className="orab89">
      <div className="container text-[#394E6A] text-5xl ">
        <h1 className="">Shopping Cart</h1>
        <hr
          className="myhrq"
          style={{
            width: "100%",
            border: "1px solid #E2E8F4",
            marginTop: "20px",
          }}
        />
      </div>
      <div className="container flex  justify-between gap-5 subtotal">
        {cart.length !== 0 ? (
          <div className="container grid grid-cols-1 gap-10">
            {cart.map(({ id, images, price, title, count }) => (
              <div key={id} className="">
                <div className="flex">
                  <img
                    className="w-[150px] h-[150px]"
                    width={150}
                    height={150}
                    src={images}
                    alt="Album"
                  />
                  <div className="flex flex-col items-center justify-center gap-5 w-full">
                    <div className="flex items-center justify-between w-[100%]">
                      <h2 className="card-title w-[160px] h-[100px]">
                        {title.split(" ").slice(0, 2).join(" ")}
                      </h2>
                      <div className="flex flex-col h-[100px] items-center justify-center gap-5">
                        <p>Amount</p>
                        <div className="flex items-center justify-center gap-5">
                          <button
                            onClick={() => dispach(decrement(id))}
                            className="btn btn-primary"
                            disabled={count === 1}
                          >
                            -
                          </button>
                          <p>{count}</p>
                          <button
                            onClick={() => dispach(increment(id))}
                            className="btn btn-primary"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p>${Math.round(price * count)}</p>
                    </div>
                    <div className="flex w-[100%]  justify-between">
                      <div className="flex items-center gap-2">
                        {" "}
                        <p>Color:</p>
                        <span
                          style={{
                            width: "15px",
                            height: "15px",
                            border: "1px solid #000",
                            borderRadius: "50%",
                            background: "#000",
                          }}
                        ></span>
                      </div>
                      <p
                        onClick={() => dispach(deleteitem(id))}
                        className="text-blue-600 cursor-pointer"
                      >
                        Remove
                      </p>
                      <p></p>
                    </div>
                  </div>
                </div>
                <hr
                  className="myhrq"
                  style={{
                    width: "100%",
                    border: "1px solid #E2E8F4",
                    marginTop: "20px",
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <h1 className="text-3xl flex flex-col items-center">
            The product you were looking for was not found!
          </h1>
        )}
        <div className="flex flex-col gap-6 ml-5 w-[325px] p-8">
          <div
            className="w-[325px] bg-primary-content
  rounded-xl text-[#394E6A] p-8 "
          >
            <div className="flex my-3">
              <p className="mr-auto">Subtotal</p>
              <p>${Math.round(subtotal)}.00</p>
            </div>
            <hr />
            <div className="flex my-3">
              <p className="mr-auto">Shipping</p>
              <p>${shipping}.00</p>
            </div>
            <hr />
            <div className="flex my-3">
              <p className="mr-auto">Tax</p>
              <p>${tax}.00</p>
            </div>
            <hr />
            <div className="flex mt-5">
              <h3 className="mr-auto">Order Total</h3>
              <p>${Math.round(orderTotal)}.00</p>
            </div>
          </div>
          <button
            onClick={() => {
              document.getElementById("my_modal_3").showModal();
            }}
            className="btn btn-primary w-[325px]"
          >
            Checkout
          </button>
        </div>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Mahsulotlar muvaffaqiyatli olind buyurtmangiz tez orada yetkazib
            beriladi
          </p>
        </div>
      </dialog>
    </div>
  );
}
