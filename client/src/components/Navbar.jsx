import React, { useEffect } from "react";

import { NavLink } from "react-router-dom";
import Logo from "../img/mate logo.jpg"


const Navbar = () => {

    const callNavPage = async () => {
        try {
            const res = await fetch("/toggle", {
                method: "GET",
                headers: {
                    "Content-Type": "appplication/json"
                }
            });
            console.log(res);
            console.log(res.status);

            const data = await res.json();
            console.log(data);

            if (res.status !== 200) {
                const access = document.getElementById("logout");
                access.style.display = "none";
            }
            else {
                const access1 = document.getElementById("login");
                const access2 = document.getElementById("register");
                access1.style.display = "none";
                access2.style.display = "none";
            }

        } catch (err) {
            console.log("error is : " + err)
        }
    }

    useEffect(() => {
        callNavPage();
    }, [])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/"><img id="logo" src={Logo} alt="logo.ng" /></NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto ">

                            <li className="nav-item active">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/about">About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/contact">Contact</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" id="login" to="/login">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" id="register" to="/register">Registration</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" id="logout" to="/logout">Logout</NavLink>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
