import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 5000;

connectDB();

app.get("/", (req, res) => {
  res.send(
    `<h1 style="text-align: center">Welcome to the job portal server</h1>`,
  );
});

app.use((req, res) => {
  const htmlRes = `<!DOCTYPE html>
    <html>
    <head>
        <title style="text-align: center"></title>
    </head>
    <body>
        <h1 style="font-size: 24px; text-align: center">404 Not Found<br> You hit the wrong url!</h1>
        <p style="padding: 10px;text-align: center">Please give a valid url.</p>
    </body>
    </html>`;
  res.status(404).send(htmlRes);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
