import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mernColl from "../model/collection.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import auth from "../middleware/auth.js";

const router = new express.Router();

//bulid in middleware
router.use(cookieParser());

router.get("/", (req, res) => {
  res.send("home page");
});
router.get("/about", auth, (req, res) => {
  res.send(req.result);
});
router.get("/contact", (req, res) => {
  res.send("contact page");
});
router.get("/login", (req, res) => {
  res.send("signin  page");
});
router.get("/register", (req, res) => {
  res.send("signup page");
});
router.get("/getData", auth, (req, res) => {
  res.send(req.result);
});
router.get("/toggle", auth, (req, res) => {
  res.status(200).json({ message: "already login" });
});
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
      res
        .status(422)
        .json({ error: "plz filled the all the field properly...!" }); // res.json() function used to sent json response
    } else if (password !== cpassword) {
      res.status(422).json({ error: "Password are not matching" }); // res.json() function used to sent json response
    } else {
      const hashPassword = await bcrypt.hash(password, 12);
      const hashCpassword = await bcrypt.hash(cpassword, 12);
      console.log(hashPassword + " " + hashCpassword);

      const ans = await mernColl.findOne({ email: email }); // it select such document which have that field if not having such field then it return null

      if (ans) {
        res.status(422).json({ error: "email is already exit" }); // res.json() function used to sent json response
      } else {
        //creating document
        const document = new mernColl({
          name: name,
          email: email,
          phone: phone,
          work: work,
          password: hashPassword,
          cpassword: hashCpassword,
        });
        console.log("document is : " + document);

        const result = await mernColl.insertMany([document]);
        console.log("document in DB atlas is:" + result);
        res.status(201).json({ message: "Registration successfully" }); // res.json() function used to sent json response
      }
    }
  } catch (err) {
    console.log("document not created " + err);
    res.status(422).json({ error: "doucment not creted : " + err }); // res.json() function used to sent json response
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email);
    // console.log(password);

    const result = await mernColl.findOne({ email: email }); //it select such document which have that field if not having such field then it return null

    if (result) {
      const ans = await bcrypt.compare(password, result.password); // used to compare plane-txt with hash-value if both are same then it return true otherwise false

      if (ans) {
        //generate token
        const _token = jwt.sign({ _id: result._id }, process.env.SECRET_KEY);
        console.log("generate token is : " + _token);

        result.tokens = result.tokens.concat({ token: _token });
        await result.save();

        //set cookie
        res.cookie("jwt", _token, {
          expires: new Date(Date.now() + 2592000000), //30 days
          httpOnly: true,
          secure: true, // ✅ true for HTTPS (Netlify + Vercel are HTTPS)
          sameSite: "None", // ✅ required when cross-origin
        });

        console.log("login successfully");
        res.json({ message: "login successfully" }); // res.json() function used to sent json response
      } else {
        console.log("Invalid Password");
        res.status(400).json({ error: "Invalid Password" }); // res.json() function used to sent json response
      }
    } else {
      console.log("Invalid Email");
      res.status(400).json({ error: "Invalid Email" }); // res.json() function used to sent json response
    }
  } catch (err) {
    console.log("Failed to Login : " + err);
    res.status(400).json({ error: "Failed to Login : " + err }); // res.json() function used to sent json response
  }
});

router.get("/logout", auth, async (req, res) => {
  try {
    res.clearCookie("jwt");

    //logout from perticular device
    req.result.tokens = req.result.tokens.filter((currElement) => {
      return req.token !== currElement.token;
    });

    //logout from all device
    // req.result.tokens = [];

    await req.result.save();

    res.json({ message: "Logout successfully" }); // res.json() function used to sent json response
  } catch (err) {
    console.log("Failed to logout " + err);
    res.status(400).json({ error: "Failed to logout : " + err }); // res.json() function used to sent json response
  }
});

router.post("/contact", auth, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      res
        .status(422)
        .json({ error: "plz filled the all the field properly...! " });
    } else {
      const result = await mernColl.findOne({ _id: req.userID });
      console.log("document is : " + result);

      result.messages = result.messages.concat(req.body);
      await result.save();

      res.status(201).json({ message: "message send successfully..." });
    }
  } catch (err) {
    console.log(" messsage not send : " + err);
    res.status(422).json({ error: "message not send " + err });
  }
});

export default router;
