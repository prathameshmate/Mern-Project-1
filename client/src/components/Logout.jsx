import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const callLogoutPage = async () => {
    try {
      // it call the get method having /logout in back-end
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/logout`, {
        //fetch used to called the function of backend from frontend
        method: "GET",
        headers: {
          "Content-Type": "appplication/json",
        },
      });

      console.log(res);
      console.log(res.status);

      const data = await res.json(); // extract the json from res
      console.log(data);

      if (res.status !== 200) {
        alert("Failed to logout : " + data.error);
        console.log("Failed to logout : " + data.error);

        if (res.status === 401) {
          navigate("/login");
        } else {
          navigate("/");
        }
      } else {
        alert(data.message);
        console.log(data.message);
        navigate("/login");
      }
    } catch (err) {
      console.log("Failed to logout :  " + err);
    }
  };

  useEffect(() => {
    callLogoutPage();
  }, []);

  return (
    <>
      <h1>Loding........</h1>
    </>
  );
};
export default Logout;
