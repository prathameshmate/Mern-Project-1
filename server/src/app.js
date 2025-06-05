import express from "express";
import "./db/conn.js";
import cors from "cors";
const app = express();

import router from "./routes/router.js";

const port = process.env.PORT || 5000;

// build in middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Only allow your frontend origin
    methods: ["GET", "POST"],
    credentials: true, // ✅ Important for cookies
  })
);
app.use(express.json());
app.use(router);
// app.use(cors()); // Allow all origins by default

app.listen(port, () => {
  console.log(`Listining to the port number ${port}`);
});
