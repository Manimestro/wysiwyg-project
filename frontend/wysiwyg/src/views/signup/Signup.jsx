import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useToken } from "../../lib/utils/";
import { useNavigate, Link } from "react-router-dom";
import { pageDesignContext } from "../../lib/context/";

export default function SignupPage() {
  const navigate = useNavigate();
  const pageDesignState = useContext(pageDesignContext);

  const [signupPageDet, setSignupPageDet] = useState({
    email: "",
    password: "",
    confPass: "",
    err: [],
  });

  const [token, setToken] = useToken();

  useEffect(() => {
    if (token) {
      navigate("/designer");
    }
  }, [navigate, token]);

  const isValidEmailAddress = (emailAddress) => {
    let pattern = new RegExp(
      /^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i,
    );
    return pattern.test(emailAddress);
  };

  const onSignupClicked = async (e) => {
    e.preventDefault();

    let _errs = [];

    if (signupPageDet.password !== signupPageDet.confPass) {
      _errs.push("Password do not match");
    }

    if (!isValidEmailAddress(signupPageDet.email)) {
      _errs.push("Invalid email address");
    }

    if (signupPageDet.password.length < 8) {
      _errs.push("Password has to be at least 8 characters");
    }

    if (_errs.length === 0) {
      let username = signupPageDet.email.split("@")[0];
      username = username.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "");

      await axios
        .post(`${process.env.REACT_APP_BACKEND_ENDPOINT}api/signup`, {
          email: signupPageDet.email,
          password: signupPageDet.password,
          username,
        })
        .then((response) => {
          const { token } = response.data;
          setToken(token);
          pageDesignState.setTokenTracker(token);
          navigate("/my-websites");
        })
        .catch((error) => {
          console.error(error);
          _errs.push("Something went wrong, Try recreating the account");
        });
    }

    setSignupPageDet({ ...signupPageDet, err: _errs });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={onSignupClicked}
        className="block w-full max-w-md p-10 rounded-lg border border-gray-200"
      >
        <h1 className="text-center text-xl font-bold mb-5">Sign Up</h1>
        <p className="text-center text-sm mb-5">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>

        {signupPageDet.err.length > 0 && (
          <div className="text-center bg-red-200 text-red-600 rounded p-4 mb-5">
            <ul>
              {signupPageDet.err.map((e, index) => (
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
              setSignupPageDet({ ...signupPageDet, email: e.target.value })
            }
            value={signupPageDet.email}
            placeholder="Enter Email"
            name="email"
            required
            className="w-full border border-gray-200 rounded-md py-2 px-3 mt-1 focus:outline-none focus:border-blue-500"
          />
        </label>

        <label htmlFor="password" className="block mt-4">
          <b>Password</b>
          <input
            type="password"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            onChange={(e) =>
              setSignupPageDet({ ...signupPageDet, password: e.target.value })
            }
            value={signupPageDet.password}
            placeholder="Enter Password"
            name="password"
            required
            className="w-full border border-gray-200 rounded-md py-2 px-3 mt-1 focus:outline-none focus:border-blue-500"
          />
        </label>

        <label htmlFor="confPass" className="block mt-4">
          <b>Repeat Password</b>
          <input
            type="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            onChange={(e) =>
              setSignupPageDet({ ...signupPageDet, confPass: e.target.value })
            }
            value={signupPageDet.confPass}
            placeholder="Repeat Password"
            name="confPass"
            required
            className="w-full border border-gray-200 rounded-md py-2 px-3 mt-1 focus:outline-none focus:border-blue-500"
          />
        </label>

        <p className="text-xs mt-4">
          By creating an account you agree to our{" "}
          <a href="#" className="text-blue-500">
            Terms & Privacy
          </a>
          .
        </p>

        <div className="clearfix mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white rounded-md py-2 px-4 text-center transition duration-300 ease-in-out hover:bg-blue-600"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
