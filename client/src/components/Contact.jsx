import React, { useEffect, useState } from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';

const Contact = () => {

    const [document, updateDocument] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    })

    const callContactPage = async () => {
        try {

            // it call the get method having /getData in backend
            const res = await fetch("/getData", {     //fetch used to called the function of backend from frontend
                method: "GET",
                headers: {
                    "Content-Type": "appplication/json"
                }
            });

            console.log(res);
            console.log(res.status);

            const result = await res.json();   // extract json from res

            console.log("document/json is : ");
            console.log(result);

            if (res.status !== 200) {
                throw new Error(result.error)
            }
            else {
                updateDocument({ ...document, name: result.name, email: result.email, phone: result.phone });
            }
        }
        catch (err) {
            console.log("failed to view contact page details : " + err);
        }
    }

    // useEffect hook automatically called after the render
    useEffect(() => {
        callContactPage();
    }, [])      //firsttime rendor


    const messageFun = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        updateDocument({ ...document, [name]: value })
    }


    // sending message
    const sentMessage = async (event) => {
        try {
            // it call the postmethod having /register in back-end  
            const res = await fetch("/contact", {   //fetch used to called the function of backend from frontend
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(document)               // obj to json
            });

            const data = await res.json();  // extract the json from res
            console.log(res);
            console.log(data);
            console.log(res.status);

            if (res.status !== 201) {
                alert("failed to send message :  " + data.error);
                console.log("failed to send message :  " + data.error);
            }
            else {
                alert(data.message);
                console.log(data.message);

                updateDocument({...document , message : ""})
            }
        }
        catch (err) {
            console.log("failed to send message :  " + err);
        }
    }
    return (
        <>
            <div className="contact_container">
                <div className="upper_container">
                    <div id="phone" className="box">
                        <PhoneIcon />
                        <div className="details">
                            <h6>Phone</h6>
                            <p>+91 1111 456 789</p>
                        </div>

                    </div>
                    <div id="email" className="box">
                        <EmailIcon />
                        <div className="details">
                            <h6>Email</h6>
                            <p>prathameshmate02@gmail.com</p>

                        </div>

                    </div>
                    <div id="address" className="box">
                        <HomeIcon />
                        <div className="details">
                            <h6>Adress</h6>
                            <p>Nashik , Maharashtra</p>

                        </div>

                    </div>
                </div>
                <div className="lower_container">
                    <div className="getintouch">
                        <h2>Get In Touch</h2>
                    </div>
                    <div className="input_fileds">
                        <input type="text" name="name" value={document.name} placeholder="Your Name" onChange={messageFun} required="true" />
                        <input type="email" name="email" value={document.email} placeholder="Your Email" onChange={messageFun} required="true" />
                        <input type="number" name="phone" value={document.phone} placeholder="Your phone" onChange={messageFun} required="true" />
                    </div>
                    <div className="message">
                        <textarea name="message" cols="109" rows="6" value={document.message} onChange={messageFun} placeholder="Type Your Message"></textarea>
                    </div>
                    <div className="button">
                        <button type="button" className="btn btn-success" onClick={sentMessage}>Send Message</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Contact;   