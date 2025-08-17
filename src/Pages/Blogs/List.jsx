import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinners from "../../Components/Spinners";
import { initFlowbite } from "flowbite";
import { URL } from "../../App";
import { FailedMessage, SuccessMessage } from "../../Components/ToastMessage";
import moment from "moment";

function List() {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  const [Response, setResponse] = useState({
    status: null,
    message: "",
  });
  const [Loading, setLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [Search, setSearch] = useState("");
  const [Delete, setDelete] = useState(null);

  useEffect(() => {
    initFlowbite();
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [Search]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${URL}/api/blog/list?search=${Search}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setData(response.data.blogs);
    } catch (error) {
      console.error(error);
      setResponse({
        status: "Failed",
        message: error.response ? error.response.data.message : error.message,
      });
      if (error.response.status === 401) {
        setTimeout(() => {
          window.localStorage.clear();
          navigate("/");
        }, 5000);
      }
    } finally {
      setResponse({
        status: null,
        message: "",
      });
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${URL}/api/blog/${id}/delete`, {
        headers: {
          Authorization: token,
        },
      });
      setDelete(null);
      setData(response.data.blogs);
      setResponse({
        status: "Success",
        message: response.data.message,
      });
      setTimeout(() => {
        setResponse({
          status: null,
          message: "",
        });
      }, 5000);
    } catch (error) {
      console.error(error);
      setResponse({
        status: "Failed",
        message: error.response ? error.response.data.message : error.message,
      });
      if (error.response.status === 401) {
        setTimeout(() => {
          window.localStorage.clear();
          navigate("/");
        }, 5000);
      }
      if (error.response.status === 500) {
        setTimeout(() => {
          setResponse({
            status: null,
            message: "",
          });
        }, 5000);
      }
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-col w-full p-5 space-y-10 bg-white rounded-t-lg">
        <div className="flex flex-wrap items-end justify-between w-full gap-5">
          <h1 className="text-lg font-semibold text-spangles-700">Blogs</h1>
          <div className="flex items-center space-x-5">
            <div>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                  <svg
                    className="w-3 h-3 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-40 py-1 text-sm text-gray-900 rounded ps-8 bg-gray-50 focus:ring-spangles-800 focus:border-spangles-800 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-spangles-800 dark:focus:border-spangles-800"
                  placeholder="Search..."
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <Link
              to="/admin/blogs/add/new"
              className="px-3 py-1 space-x-2 text-sm text-white rounded bg-spangles-700 hover:bg-spangles-800 focus:ring-4 focus:ring-spangles-200"
            >
              <span>
                <i className="fa-solid fa-plus"></i> New Blog
              </span>
            </Link>
          </div>
        </div>
        {Loading ? (
          <Spinners />
        ) : Data.length === 0 ? (
          <div>No Records Found</div>
        ) : (
          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {Data &&
              Data.map((item, index) => (
                <div
  key={index}
  className="flex flex-col w-full h-full bg-white border border-gray-200 rounded-lg hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
>
  <img
    onClick={() => navigate(`/admin/blogs/${item._id}/preview`)}
    className="object-cover w-full rounded-t-lg hover:cursor-pointer"
    style={{ height: '14rem', aspectRatio: 1.1 }}
    src={`${URL}/${item.image}`}
    alt=""
  />
  <div className="flex flex-col justify-between flex-1 p-5">
    <p className="text-gray-700 dark:text-gray-400">
      <i className="fa-regular fa-clock"></i>
      &nbsp;&nbsp;&nbsp;&nbsp;
      {moment(new Date(item.posted_on)).format("DD MMMM YYYY")}
    </p>
    <h6
      onClick={() => navigate(`/admin/blogs/${item._id}/preview`)}
      className="mt-2 text-base font-semibold tracking-tight text-gray-900 truncate cursor-pointer dark:text-white"
    >
      {item.title}
    </h6>
    <div className="flex justify-end mt-5 space-x-2">
      <button
        onClick={() => setDelete(item._id)}
        className="py-2.5 px-5 text-sm font-medium text-red-500 rounded-lg bg-white border border-gray-200 hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <i className="fa-solid fa-trash-can"></i> Delete
      </button>
      <Link
        to={`/admin/blogs/${item._id}/edit`}
        className="py-2.5 px-5 text-sm font-medium text-spangles-700 rounded-lg bg-white border border-gray-200 hover:bg-spangles-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-spangles-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <i className="fa-regular fa-pen-to-square"></i> Edit
      </Link>
    </div>
  </div>
</div>
              ))}
          </div>
        )}
      </div>

      {Delete !== null && (
        <div
          data-modal-backdrop="static"
          tabIndex="-1"
          aria-hidden="true"
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-md max-h-full p-4">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => setDelete(null)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 text-center md:p-5">
                <svg
                  className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to Delete?
                </h3>
                <button
                  onClick={() => setDelete(null)}
                  type="button"
                  className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-spangles-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(Delete)}
                  type="button"
                  className="text-white ms-5 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {Response.status !== null ? (
        Response.status === "Success" ? (
          <SuccessMessage Message={Response.message} />
        ) : Response.status === "Failed" ? (
          <FailedMessage Message={Response.message} />
        ) : null
      ) : null}
    </React.Fragment>
  );
}

export default List;
