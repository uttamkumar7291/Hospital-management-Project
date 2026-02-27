import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  const resend = new Resend(process.env.RESEND_API_KEY);

  app.use(express.json());

  // API Route to check if service is configured
  app.get("/api/config-status", (req, res) => {
    res.json({ 
      emailService: !!process.env.RESEND_API_KEY,
      mapsService: !!process.env.VITE_GOOGLE_MAPS_API_KEY,
      aiService: !!process.env.GEMINI_API_KEY
    });
  });

  // API Route to send emails
  app.post("/api/send-email", async (req, res) => {
    const { to, subject, content } = req.body;

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: "Email service not configured (RESEND_API_KEY missing)" });
    }

    try {
      const data = await resend.emails.send({
        from: 'Vitalis Hospital <onboarding@resend.dev>',
        to: [to],
        subject: subject,
        html: `<div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #2563eb;">Vitalis Hospital</h2>
                <p>${content}</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                <p style="font-size: 12px; color: #666;">This is an automated message from Vitalis Hospital Management System.</p>
              </div>`,
      });

      res.json({ success: true, data });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer(); 
