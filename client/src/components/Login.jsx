import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const url = process.env.BaseURL;
console.log("url", url);

const Login = () => {
  const navigate = useNavigate();
  const url = process.env.REACT_APP_BASE_URL;
  console.log("REACT_APP_BASE_URL", url);

  const [obj, updateObj] = useState({
    email: "",
    password: "",
  });

  const fun = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    updateObj({
      ...obj,
      [name]: value,
    });
  };

  //send the all data which we filled in login form to the request of post method of backend (http://localhost:5000/login)
  const postData = async (event) => {
    try {
      event.preventDefault(); //prevent default behaviour of form

      // it call the  post method having /login in back-end
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
        //fetch used to called the function of backend from frontend
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj), // obj to json
        credentials: "include", //Important for cookies
      });

      const data = await res.json(); // extract the json from res

      console.log(res);
      console.log(data);
      console.log(res.status);

      if (res.status !== 200) {
        alert("Invalid Login details : " + data.error);
        console.log("Invalid Login details : " + data.error);
      } else {
        alert(data.message);
        console.log(data.message);

        navigate("/");
      }
    } catch (err) {
      console.log("something went wrong : " + err);
      alert("something went wrong : " + err);
    }
  };

  return (
    <>
      <div className="registration_form">
        <form name="login" method="POST">
          <label>Email </label> <span id="ans1"></span> <br />
          <input
            className="inp"
            type="email"
            name="email"
            placeholder="Enter Your Email ID "
            onChange={fun}
          />
          <br />
          <label>Password : </label> <br />
          <input
            className="inp"
            type="password"
            name="password"
            placeholder="Enter password "
            onChange={fun}
          />
          <br />
          <br />
          <div id="btn">
            <button
              type="submit"
              className="btn btn-success"
              name="login"
              onClick={postData}
            >
              Login
            </button>
          </div>
          <a href="/register">Create Account</a>
        </form>
      </div>
    </>
  );
};
export default Login;
