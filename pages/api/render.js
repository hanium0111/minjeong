import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { filename } = req.query;

  if (!filename) {
    res.status(400).json({ error: "Filename is required" });
    return;
  }

  const filePath = path.join(process.cwd(), "data/testCode", `${filename}`);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.status(404).json({ error: "File not found" });
      return;
    }
    res.status(200).json({ content: data });
  });
}
