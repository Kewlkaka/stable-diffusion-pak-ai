import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import stablediffusionRoutes from "./routes/stablediffusionRoutes.js";

dotenv.config(); //pool env variables from .env file

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

//api endpoints for frontend
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/stablediffusion", stablediffusionRoutes);

app.get("/", async (req, res) => {
  res.send("Hello from DALL-E");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () =>
      console.log(`Server has started on port http://localhost:8080`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
