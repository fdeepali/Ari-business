import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Contact from "./models/Contact.js";

dotenv.config();

const app = express();

// ---------------- MIDDLEWARE ----------------
app.use(cors());
app.use(express.json());

// ---------------- MONGODB ----------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ---------------- CONTACT FORM ROUTE (INLINE) ----------------
app.post("/api/contact-form", async (req, res) => {
  try {
    console.log("✅ /api/contact-form hit");
    console.log("Headers:", req.headers["content-type"]);
    console.log("Body:", req.body);

    const { name, email, phone, storeUrl, goals } = req.body;

    if (!name || !email || !phone || !goals) {
      return res.status(400).json({
        success: false,
        message: "Missing required contact fields",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      storeUrl,
      goals,
    });

    console.log("📩 Contact saved:", contact._id);

    return res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      id: contact._id,
    });
  } catch (err) {
    console.error("❌ Contact form error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to submit contact form",
    });
  }
});

import QuestionnaireSubmission from "./models/DB_Questionnaire.js";
import Links from "./models/Links.js";
// ---------------- QUESTIONNAIRE ROUTE (INLINE) ----------------
app.post("/api/questionnaire", async (req, res) => {
  try {
    console.log("✅ /api/questionnaire hit");
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Body:", req.body);

    const { contactInfo, businessDetails } = req.body;

    // ---------------- VALIDATION ----------------
    if (
      !contactInfo ||
      !contactInfo.name ||
      !contactInfo.email ||
      !contactInfo.phone
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required contactInfo fields (name, email, phone)",
      });
    }

    if (
      !businessDetails ||
      typeof businessDetails !== "object" ||
      Object.keys(businessDetails).length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "businessDetails is required and cannot be empty",
      });
    }

    // ---------------- SAVE TO DB ----------------
    const submission = await QuestionnaireSubmission.create({
      contactInfo: {
        name: contactInfo.name,
        email: contactInfo.email,
        phone: contactInfo.phone,
        businessName: contactInfo.businessName || "",
      },
      businessDetails,
    });

    console.log("📊 Questionnaire saved:", submission._id);

    return res.status(201).json({
      success: true,
      message: "Questionnaire submitted successfully",
      id: submission._id,
    });

  } catch (err) {
    console.error("❌ Questionnaire error:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to submit questionnaire",
    });
  }
});

app.get("/api/contact-forms", async (req, res) => {
  try {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    if(token !== process.env.HEADER_API_KEY){
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const forms = await Contact.find().sort({ createdAt: -1 });
    return res.json({
      success: true,
      data: forms,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Internal server error!",
    })
  }
});

app.get('/api/increament-url', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ success: false });
    }

    const link = await Links.findOne({ url });
    if (!link) {
      return res.status(404).json({ success: false });
    }

    link.count += 1;
    await link.save();

    return res.status(200).json({
      success: true,
      message: "Link count incremented",
      count: link.count,
    });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
});


app.get('/api/links', async (req, res) => {
  try {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    if(token !== process.env.HEADER_API_KEY){
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const data = await Links.find();
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
})

app.post('/api/add-link', async (req, res) => {
  try {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    if(token !== process.env.HEADER_API_KEY){
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const {url, name} = req.body;
    if(!url || !name){
      return res.status(400).json({
        success: false,
        message: "URL and Name are required",
      });
    }

    const newLink = new Links({url, name});
    await newLink.save();

    return res.status(201).json({
      success: true,
      message: "Link added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
    });
  }
})

app.get("/api/questionnaire-submissions", async (req, res) => {
  try {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];
    if(token !== process.env.HEADER_API_KEY){
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const submissions = await QuestionnaireSubmission.find().sort({ createdAt: -1 });
    return res.json({
      success: true,
      data: submissions,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Internal server error!",
    });
  }
})

// ---------------- HEALTH CHECK ----------------
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
