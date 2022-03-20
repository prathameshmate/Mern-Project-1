import express from "express";
import "./db/conn.js"

import router from "./routes/router.js"

const app =  express();

const port = process.env.PORT || 5000;

// build in middleware
app.use(express.json());
app.use(router);

app.listen(port , ()=>{
    console.log(`Listining to the port number ${port}`)
})

