import express from "express";
import "./db/conn.js";
import cors from "cors";
const app = express();

import router from "./routes/router.js";

const port = process.env.PORT || 5000;

// build in middleware
// app.use(cors()); // Allow all origins by default
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://mern-project-1-three.vercel.app",
    ], // Only allow your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // ✅ Important for cookies
  })
);
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Listining to the port number ${port}`);
});
