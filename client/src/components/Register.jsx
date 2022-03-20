import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate();

    const [obj, updateObj] = useState({
        name: "",
        email: "",
        phone: "",
        work: "",
        password: "",
        cpassword: ""
    });

    const fun = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        updateObj(
            {
                ...obj,
                [name]: value
            }
        )

    }

    //send the all data which we filled in register form to the request of post method of backend (http://localhost:5000/register)
    const postData = async (event) => {
        try {


            event.preventDefault();  //prevent default behaviour of form

            // it call the postmethod having /register in back-end  
            const res = await fetch("/register", {   //fetch used to called the function of backend from frontend
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)               // obj to json
            });

            const data = await res.json();  // extract the json from res

            console.log(res);
            console.log(data);
            console.log(res.status);

            if (res.status === 422) {
                alert("Invalid Registration : " + data.error);
                console.log("Invalid Registration : " + data.error);
            }
            else {
                alert(data.message);
                console.log(data.message);

                navigate("/");
            }
        }
        catch (err) {
            console.log("something went wrong : " + err);
            alert("something went wrong : " +err);
        }

    }

    return (
        <>
            <div className="registration_form">

                <form name="register" method='POST' >
                    <label>Name : </label> <span id="ans"></span> <br />
                    <input className="inp" type="text" name="name" placeholder="Enter Your Name " onChange={fun} />
                    <br />

                    <label>Email </label> <span id="ans1"></span> <br />
                    <input className="inp" type="email" name="email" placeholder="Enter Your Email ID " onChange={fun} />
                    <br />

                    <label>Phone :</label> <span id="ans2"></span> <br />
                    <input className="inp" type="number" name="phone" placeholder="Enter Your 10 digit Contact Number"
                        onChange={fun} />

                    <br />

                    <label>Profession :</label> <span id="ans3"></span> <br />
                    <input className="inp" type="text" name="work" placeholder="Enter Your Profession : " onChange={fun} />

                    <br />
                    <label>Password : </label> <br />
                    <input className="inp" type="password" name="password" placeholder="Enter password " onChange={fun} />

                    <br />
                    <label>Confirm Password : </label> <br />
                    <input className="inp" type="password" name="cpassword" placeholder="confirm password " onChange={fun} />

                    <br />
                    <br />
                    <br />
                    <div id="btn">
                        <button type="submit" className="btn btn-success" name="register" onClick={postData} >Register</button>
                    </div>
                    <p>Already Register , Click here to Login  : <a href="/login">Login</a></p>

                </form>
            </div>

        </>
    );
}

export default Signup;