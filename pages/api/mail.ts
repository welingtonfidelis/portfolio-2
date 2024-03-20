import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";

const SENDER_MAIL = process.env.NEXT_PUBLIC_SENDER_MAIL!;
const SENDER_MAIL_PASSWORD = process.env.NEXT_PUBLIC_SENDER_MAIL_PASSWORD!;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== "POST") {
    return res.status(404).send({ ok: false, message: "Route not found" });
  }

  try {
    const { email, subject, message } = req.body;

    // Using sendgrid
    // sgMail.setApiKey(SENDGRID_API_KEY);
    // await sgMail.send({
    //   to: "welingtonfidelis@gmail.com",
    //   from: email,
    //   subject,
    //   html: message,
    // });

    // Using nodemailer
    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: SENDER_MAIL,
        pass: SENDER_MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: SENDER_MAIL, // sender address
      to: "welingtonfidelis@gmail.com", // receiver (use array of string for a list)
      subject, // Subject line
      html: `<strong>From: ${email}</strong><p><p><strong>Message: </strong><p>${message}`, // plain text body
    };

    await transporter.sendMail(mailOptions);

    res.json({ ok: true, message: "Email sent" });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};
