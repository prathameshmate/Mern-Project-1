import express from "express";
import "./db/conn.js";
import cors from "cors";
const app = express();

import router from "./routes/router.js";

const port = process.env.PORT || 5000;

// build in middleware
// app.use(cors()); // Allow all origins by default
// Allow both Netlify frontend and local development
const allowedOrigins = [
  "http://localhost:3000",
  "https://mern-project-three.netlify.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Listining to the port number ${port}`);
});
