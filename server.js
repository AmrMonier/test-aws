import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.get("/", (req, res, next) => {
  res.json({ msg: "Hello" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`APP Running on ${PORT}`);
});
