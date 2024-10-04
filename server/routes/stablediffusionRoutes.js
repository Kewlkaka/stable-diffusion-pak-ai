import express from "express";
import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const router = express.Router();

const HF_API_URL =
  "https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4";

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

router.route("/").get((req, res) => {
  res.send("Hello from Hugging Face STABLE DIFF Image Generator");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      HF_API_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer", // This is important
      }
    );

    const base64Image = Buffer.from(response.data, "binary").toString("base64");

    res.status(200).json({ photo: base64Image });
  } catch (error) {
    console.error("Error details:", error.response?.data);
    res
      .status(500)
      .send(error?.response?.data?.error || "Something went wrong");
  }
});

export default router;
