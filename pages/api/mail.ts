import sgMail from "@sendgrid/mail";
import type { NextApiRequest, NextApiResponse } from "next";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!;
const DESTINATION_EMAIL = process.env.DESTINATION_EMAIL!;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== "POST") {
    return res.status(404).send({ ok: false, message: "Route not found" });
  }

  try {
    const { email, subject, message } = req.body;  

    sgMail.setApiKey(SENDGRID_API_KEY);
    await sgMail.send({
      to: DESTINATION_EMAIL,
      from: email,
      subject,
      html: message,
    });

    res.json({ ok: true, message: "Email sent" });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message || "Internal server error",
    });
  }
};
