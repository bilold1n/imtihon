import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  addtocart,
  decrement,
  deleteitem,
  increment,
} from "../../apps/cartslice";
import { useDispatch, useSelector } from "react-redux";
export default function Home() {
  const { cart } = useSelector((state) => state.cart);

  const dispach = useDispatch();
  const { data, isLoading, erorr } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const url = "https://dummyjson.com/products";
      const req = await fetch(url);
      const res = await req.json();
      return res?.products.sort((a, b) => b.rating - a.rating).splice(0, 9);
    },
  });
  console.log(data);
  return (
    <>
      <div className="container flex justify-between items-center h-[300px] mt-[80px] home">
        <div className="flex flex-col gap-6">
          <h2 className="w-[450px] text-[#394E6A] text-5xl mytitle">
            We are changing the way people shop
          </h2>
          <p className="w-[450px] mydesc">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
            repellat explicabo enim soluta temporibus asperiores aut obcaecati
            perferendis porro nobis.
          </p>
          <Link
            to={"/product"}
            className="btn  bg-[#057AFF] text-[#fff]  w-[140px]"
          >
            Our Products
          </Link>
        </div>
        <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4 pb-2">
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
              className="rounded-box"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
              className="rounded-box"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="container">
          <h1 className="text-4xl text-[#394E6A]">Featured products</h1>
          <hr
            style={{
              background: "#E2E8F4",
              marginTop: "28px",
              marginBottom: "50px  ",
            }}
            className="myhr"
          />
        </div>
        {isLoading && (
          <div className=" mt-10 flex items-center justify-center">
            <span
              style={{ zoom: "2" }}
              className="loading loading-dots loading-lg"
            ></span>
          </div>
        )}
        {data?.length == 0 ? (
          <h1 className="text-center text-3xl">No data</h1>
        ) : (
          <div className="container mb-11 grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3  md:gap-20  ">
            {data &&
              data.map(({ id, images, price, rating, title }, ind) => {
                return (
                  <div
                    key={id}
                    className="card w-[350px] bg-base-100  containerr"
                  >
                    <figure>
                      <img
                        width={300}
                        height={250}
                        className="w-[300px] h-[250px] object-scale-down object-center"
                        src={images[0]}
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">
                        {title}
                        <div className="badge badge-secondary">NEW</div>
                      </h2>
                      <div className="card-actions justify-end">
                        <div className="badge badge-outline p-3">
                          Price - {price}💲
                        </div>
                        <div className="badge badge-outline p-3">
                          Rating - {rating}⭐
                        </div>
                      </div>
                    </div>

                    {cart.findIndex((item) => item.id === id) != "-1" ? (
                      <div className="flex items-center justify-center gap-5">
                        <button
                          onClick={() => {
                            if (
                              cart[cart.findIndex((item) => item.id === id)]
                                .count === 1
                            ) {
                              return dispach(deleteitem(id));
                            }

                            dispach(decrement(id));
                          }}
                          className="btn  btn-primary"
                        >
                          -
                        </button>
                        <p>
                          {cart[cart.findIndex((item) => item.id === id)].count}
                        </p>
                        <button
                          onClick={() => dispach(increment(id))}
                          className="btn  btn-primary"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          dispach(
                            addtocart({
                              id,
                              title,
                              images,

                              price,
                            })
                          );
                        }}
                        className="btn  btn-primary"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
}
