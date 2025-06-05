import jwt from "jsonwebtoken";
import mernColl from "../model/collection.js";

const auth = async (req, res, next) => {
  try {
    const _token = req.cookies.jwt;
    const userVerify = jwt.verify(_token, process.env.SECRET_KEY);
    console.log(userVerify); //{ _id: '6209295712a2b9f30e97e20a', iat: 1644772441 }

    const result = await mernColl.findOne({ _id: userVerify._id });
    console.log(result);

    req.token = _token;
    req.result = result;
    req.userID = result._id;

    next();
  } catch (err) {
    // res.status(401).send("you need to login : "+err);
    res.status(401).json({ error: "you need to login : " + err });
  }
};

export default auth;
