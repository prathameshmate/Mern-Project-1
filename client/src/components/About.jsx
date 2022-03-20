import React, { useEffect, useState } from 'react';
import img from "../img/RESUME IMG.jpg"
import unknown from "../img//unknown.jpg"
import InstagramIcon from '@mui/icons-material/Instagram';
import { useNavigate } from 'react-router-dom';

const About = () => {

    const navigate = useNavigate();

    const [document, updateDocument] = useState({});

    const callAboutPage = async () => {
        try {
            // it call the get method having /about in backend
            const res = await fetch("/about", {   //fetch used to called the function of backend from frontend
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "appplication/json"
                },
                credentials: "include"
            });

            console.log(res);
            console.log(res.status);

            const result = await res.json();  // extract the json from res

            console.log("document/json is : ");
            console.log(result);

            if (res.status !== 200) {
                throw new Error(result.error)
            }
            else {
                updateDocument(result);

            }
        } catch (err) {
            console.log("failed to view about page  : " + err);
            navigate("/login");
        }
    }

    // useEffect hook automatically called after the render
    useEffect(() => {
        callAboutPage();
    }, [])     ///firsttime rendor

    function fun(name) {
        var i;
        var x = window.document.getElementsByClassName("data");
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
        window.document.getElementById(name).style.display = "block";
    }

    return (
        <> <div className="about_body">
            <div className="about_form">
                <div className="left_side">
                    <div className="img" >
                        <img src={document.name === "prathamesh sudam mate" ? img : unknown} style={{ width: "200px", height: "210px" }} alt="img.png" />
                    </div>
                    <br />
                    <br />
                    <div className="Socials">
                        <h5>Socials</h5>

                        <ul >
                            <li >
                                <a href="https://www.instagram.com/accounts/login/" target="blank" ><InstagramIcon /> Instagram</a>
                            </li>
                            <li>
                                <a href="https://www.youtube.com/" target="blank"><InstagramIcon /> Youtube</a>
                            </li>
                            <li>
                                <a href="https://www.linkedin.com/in/prathamesh-mate-6234431a9/" target="blank"><InstagramIcon /> Linkdin</a>
                            </li>
                            <li>
                                <a href="https://github.com/prathameshmate" target="blank"><InstagramIcon /> Github</a>
                            </li>
                        </ul>

                    </div>
                </div>
                <div className="right_side">
                    <div className="upper_side" >
                        <h5>{document.name}</h5>
                        <h6>{document.work}</h6>
                        <p>Ranking : 1/10</p>
                        <div className="button1">
                            <button type="button" className="btn btn-light">Edit Profile</button>
                        </div>
                    </div>
                    <div className="lower_side">
                        <div>
                            <button type="button" className="about" onClick={() => { fun("about") }}>About</button>
                            <button type="button" className="timeline " onClick={() => { fun("timeline") }}>Timeline</button>
                        </div>
                        <hr />
                        <div id="content">
                            <div id="about" className="data">
                                <div>
                                    <h6>User ID : </h6>
                                    <p> {document._id}</p>
                                </div>

                                <div>
                                    <h6>Name : </h6>
                                    <p> {document.name}</p>
                                </div>

                                <div>
                                    <h6>Email :  </h6>
                                    <p>{document.email}</p>
                                </div>
                                <div>
                                    <h6>Phone :  </h6>
                                    <p> {document.phone}</p>
                                </div>
                                <div>
                                    <h6>Profession : </h6>
                                    <p> {document.work}</p>
                                </div>

                            </div>

                            <div id="timeline" className="data" style={{ display: "none" }}>
                                <div>
                                    <h6>Experience : </h6>
                                    <p> Fresher</p>
                                </div>

                                <div>
                                    <h6>Hourly Rate : </h6>
                                    <p> 0$/hr</p>
                                </div>

                                <div>
                                    <h6>Total Projects :  </h6>
                                    <p> 9</p>
                                </div>
                                <div>
                                    <h6>English level :  </h6>
                                    <p> Expert</p>
                                </div>
                                <div>
                                    <h6>Avability : </h6>
                                    <p> Available</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default About;