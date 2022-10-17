const cors = require("cors");
import dotenv from "dotenv";
import express from "express";
import { Request, Response } from "express-serve-static-core";
import body_parser from "body-parser";
import { LoginHandler } from "./post/login";
import { GetUser } from "./get/user";

dotenv.config();

const app = express();

app.use(cors());
app.use(body_parser.json());

app.get("/", (req: Request, res: Response) => {
  res.send(`You probably shouldn't be here...`);
});

app.post("/login", async (req, res) => res.send(await LoginHandler(req)));
app.get("/user", async (req, res) => res.send(await GetUser(req)));

app.listen(process.env.PORT, () => {
  console.log("Let's a-go!!! Running on port " + process.env.PORT);
});
