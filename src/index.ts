import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use(cors());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
