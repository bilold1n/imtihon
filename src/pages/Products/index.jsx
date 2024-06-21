import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import {
  addtocart,
  decrement,
  deleteitem,
  increment,
} from "../../apps/cartslice";
import { useDispatch, useSelector } from "react-redux";
import { filterdata, getproduct, searchData } from "../../apps/product";

export default function Products() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const state = useSelector((state) => state.product);
  console.log(state.filtereddata);
  const queryClient = useQueryClient();
  console.log(state);
  const [select, setSelect] = useState("all");
  const [filters, setFilters] = useState({
    categorySelect: "all",
    search: "",
    sort: "",
    price: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productsPerPage] = useState(15);

  const { data, isLoading, error } = useQuery({
    queryKey: [currentPage],
    queryFn: async () => {
      const req = await fetch(
        `https://dummyjson.com/products?limit=${productsPerPage}&skip=${
          (currentPage - 1) * productsPerPage
        }`
      );
      const res = await req.json();
      setTotalPages(Math.ceil(res.total / productsPerPage));
      return res?.products;
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const req = await fetch("https://dummyjson.com/products/categories");
      const res = await req.json();
      return res;
    },
  });
  useEffect(() => {
    !!data?.length && dispatch(getproduct(data));
  }, [data]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handlesearch = (e) => {
    e.preventDefault();
    dispatch(filterdata(filters));
    console.log(filters);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    return pageNumbers.slice(startPage - 1, endPage).map((page) => (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`btn mx-1 ${currentPage === page ? "bg-gray-400" : ""}`}
      >
        {page}
      </button>
    ));
  };

  return (
    <>
      <section className="container salomsa">
        <form
          onSubmit={handlesearch}
          className="bg-primary-content   salomorab
  flex flex-col gap-8 mt-[80px] mb-8 rounded-xl p-8"
        >
          <div className="orab">
            <div>
              <p>Search product</p>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered"
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
              />
            </div>
            <div>
              <p>Select category</p>
              {categories && (
                <select
                  value={select}
                  onChange={(e) => {
                    setSelect(e.target.value),
                      setFilters({
                        ...filters,
                        categorySelect: e.target.value,
                      });
                  }}
                  className="select select-bordered w-[256px]"
                >
                  <option value="all">Filter by Category</option>
                  {categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <p>Select Company</p>
              <select className="select select-bordered w-[256px]">
                <option value="all">all</option>
              </select>
            </div>
            <div>
              <p>Sort by</p>
              <select
                onChange={(e) =>
                  setFilters({ ...filters, sort: e.target.value })
                }
                className="select select-bordered w-[256px]"
              >
                <option value="rating">Rating ⭐</option>
                <option value="price">Price 💲</option>
                <option value="name">A-z</option>
                <option value="!name">Z-a</option>
              </select>
            </div>
          </div>
          <div className="otab">
            <div className="w-[244px]">
              <div className="flex justify-between">
                <p>Select price</p> <p>$1,000.00</p>
              </div>
              <input
                onChange={(e) =>
                  setFilters({ ...filters, price: e.target.value })
                }
                type="range"
                min={0}
                max={100}
                className="range"
              />
              <div className="flex justify-between">
                <p>0</p> <p>Max : $1,000.00</p>
              </div>
            </div>
            <div className="flex gap-5 orabbtn">
              <button
                type="submit"
                className="btn w-[240px] bg-[#057AFF] text-white"
                style={{ color: "#fff" }}
              >
                SEARCH
              </button>
              <button
                type="button"
                onClick={() =>
                  setFilters({
                    categorySelect: "all",
                    search: "",
                    sort: "",
                    categoryCompany: "",
                    price: "",
                  })
                }
                className="btn w-[240px] bg-[#C149AD] "
                style={{ color: "#fff" }}
              >
                RESET
              </button>
            </div>
          </div>
        </form>
        <div>
          <h2 className="text-3xl mb-5"> {data?.length} products</h2>

          <hr
            style={{
              width: "100%",
              border: "1px solid #E2E8F4",
              marginTop: "20px",
              marginBottom: "80px",
            }}
          />
        </div>
        {isLoading && (
          <div className="mt-10 flex items-center justify-center">
            <span
              style={{ zoom: "2" }}
              className="loading loading-dots loading-lg"
            ></span>
          </div>
        )}
        {state.filtereddata?.length ? (
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 md:gap-20 xl:gap-x-35">
            {state.filtereddata &&
              state.filtereddata.map(
                ({ id, images, price, rating, title }, ind) => (
                  <div key={ind} className="card w-[350px] containerr">
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
                      <h2 className="card-title text-center">{title}</h2>

                      <div className="text-center">Price - {price}💲</div>
                    </div>
                    {cart.findIndex((item) => item.id === id) !== -1 ? (
                      <div className="flex items-center justify-center gap-5">
                        <button
                          onClick={() => {
                            if (
                              cart[cart.findIndex((item) => item.id === id)]
                                .count === 1
                            ) {
                              return dispatch(deleteitem(id));
                            }

                            dispatch(decrement(id));
                          }}
                          className="btn btn-primary"
                          disabled={
                            cart[cart.findIndex((item) => item.id === id)]
                              .count === 1
                          }
                        >
                          -
                        </button>
                        <p>
                          {cart[cart.findIndex((item) => item.id === id)].count}
                        </p>
                        <button
                          onClick={() => dispatch(increment(id))}
                          className="btn btn-primary"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          dispatch(
                            addtocart({
                              id,
                              title,
                              images,
                              price,
                            })
                          );
                        }}
                        className="btn btn-primary"
                        style={{ width: "50%", marginInline: "auto" }}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                )
              )}
          </div>
        ) : (
          <h1 className="text-center text-3xl">
            {/* The product you were looking for was not found! */}
          </h1>
        )}
        <div className="flex justify-center mt-10  paginationbtn">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="btn bg-[#057AFF] text-white"
            disabled={currentPage < 1}
          >
            Prev
          </button>

          {renderPageNumbers()}
          {currentPage < totalPages && (
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className="btn bg-[#057AFF] text-white"
            >
              Next
            </button>
          )}
        </div>
      </section>
    </>
  );
}
