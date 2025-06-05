import React, { useEffect, useState } from "react";

const Home = () => {
  const [name, updateName] = useState("");
  const [ans, updateAns] = useState(false);

  const callHomePage = async () => {
    try {
      // it call the get method having /getData in backend
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/getData`, {
        //fetch used to called the function of backend from frontend
        method: "GET",
        headers: {
          "Content-Type": "appplication/json",
        },
        credentials: "include", //Important for cookies
      });
      console.log(res);
      console.log(res.status);

      const result = await res.json(); // extract json from res
      console.log(result);

      if (res.status !== 200) {
        throw new Error(result.error);
      } else {
        updateName(result.name);
        updateAns(true);
      }
    } catch (err) {
      console.log("failed to view home page details : " + err);
    }
  };

  useEffect(() => {
    callHomePage();
  }, []);

  return (
    <>
      <div className="home_page">
        <div className="home_div">
          <h5>WELCOME</h5>
          <h1>{name.toUpperCase()}</h1>
          {ans ? (
            <h2>Happy , To See You Back</h2>
          ) : (
            <h1>We Are The MERN Developer</h1>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;
