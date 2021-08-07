import type { NextApiRequest, NextApiResponse } from "next";
import htmlToPdf from "html-pdf";
import getConfig from "next/config";
import fs from "fs";
const { serverRuntimeConfig } = getConfig();
import path from "path";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== "GET") {
    return res.status(404).send({ ok: false, message: "Route not found" });
  }

  try {
    const { download } = req.query;
    const htmlTemplatePath = path.join(
      serverRuntimeConfig.PROJECT_ROOT,
      "./pages/api/views/html/cv.html"
    );
    const html = fs.readFileSync(htmlTemplatePath).toString("utf8");

    if (!download || download === "false")
      return res.json({ ok: true, message: "CV generated", html });

    htmlToPdf
      .create(html, {
        type: "pdf",
        format: "A4",
        width: "1000px",
        orientation: "portrait",
      })
      .toBuffer((err, buffer) => {
        if (err) console.log(err);

        res.send(buffer);
      });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message || "Internal server error",
    });
  }
};
