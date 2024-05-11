import React, { useState, useContext, useLayoutEffect } from "react";
import axios from "axios";
import { useToken } from "../../lib/utils/";
import { useNavigate, Link } from "react-router-dom";
import { pageDesignContext } from "../../lib/context/pageDesign/pageDesign";

export function LoginPage() {
  const _backend = process.env.REACT_APP_BACKEND_ENDPOINT;
  const navigate = useNavigate();
  const pageDesignState = useContext(pageDesignContext);

  const [token, setToken] = useToken();

  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
    err: [],
  });

  useLayoutEffect(() => {
    if (token) {
      navigate("/my-websites");
    }
  }, [token, navigate]);

  const onLoginClicked = async (e) => {
    e.preventDefault();

    let _errs = [];

    await axios
      .post(_backend + "api/login", {
        email: LoginData.email,
        password: LoginData.password,
      })
      .then((response) => {
        const { token } = response.data;
        setToken(token);
        pageDesignState.setTokenTracker(token);
        navigate("/designer");
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 401) _errs.push("Unauthorized");
        else _errs.push("Something went wrong. Try again.");
      });

    setLoginData({ ...LoginData, err: _errs });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={onLoginClicked}
        className="block w-full max-w-md p-10 rounded-lg border border-gray-200"
      >
        <h1 className="text-center text-xl font-bold mb-5">Login</h1>
        <p className="text-center text-sm mb-5">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-blue-500">
            Sign Up
          </Link>
        </p>

        {LoginData.err.length > 0 && (
          <div className="text-center bg-red-200 text-red-600 rounded p-4 mb-5">
            <ul>
              {LoginData.err.map((e, index) => (
                <li key={index}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        <label htmlFor="email" className="block">
          <b>Email</b>
          <input
            type="email"
            onChange={(e) =>
              setLoginData({ ...LoginData, email: e.target.value })
            }
            value={LoginData.email}
            className="w-full border border-gray-200 rounded-md py-2 px-3 mt-1 focus:outline-none focus:border-blue-500"
            placeholder="Enter Email"
            name="email"
            required
          />
        </label>

        <label htmlFor="password" className="block mt-4">
          <b>Password</b>
          <input
            type="password"
            autoComplete="on"
            onChange={(e) =>
              setLoginData({ ...LoginData, password: e.target.value })
            }
            value={LoginData.password}
            className="w-full border border-gray-200 rounded-md py-2 px-3 mt-1 focus:outline-none focus:border-blue-500"
            placeholder="Enter Password"
            name="password"
            required
          />
        </label>

        <div className="clearfix mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md py-2 px-4 text-center transition duration-300 ease-in-out hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
