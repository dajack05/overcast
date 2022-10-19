const cors = require("cors");
import dotenv from "dotenv";
import express from "express";
import { Request, Response } from "express-serve-static-core";
import body_parser from "body-parser";
import { LoginHandler } from "./handlers/login";
import { GetUser, UpdateUser, CreateUser, RemoveUser } from "./handlers/user";

dotenv.config();

const app = express();

app.use(cors());
app.use(body_parser.json());

app.get("/", (req: Request, res: Response) => {
  res.send(`You probably shouldn't be here...`);
});

app.post("/login", async (req, res) => res.send(await LoginHandler(req)));
app.get("/user", async (req, res) => res.send(await GetUser(req)));
app.post("/user", async (req, res) => res.send(await UpdateUser(req)));
app.put("/user", async (req, res) => res.send(await CreateUser(req)));
app.delete("/user", async (req, res) => res.send(await RemoveUser(req)));

app.listen(process.env.PORT, () => {
  console.log("Let's a-go!!! Running on port " + process.env.PORT);
});
