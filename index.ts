import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import path from "path";
import { startBot } from "./utils/bot";
import { startCronjob } from "./utils/cron";
import { log } from "./utils/log";
import { monooseHelperInstance } from "./utils/MongoosHelper";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
const DB_CONNECTION = process.env.DB_CONNECTION;

if (!DB_CONNECTION) {
  throw new Error("Database credentials missing");
}

const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error("Discord credentials missing");
}

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({ message: "Hello lean-coffee!" });
});

app.get(
  "/lean-coffee-email-verification/:discordId/:verificationToken",
  async (req: Request, res: Response) => {
    const { discordId, verificationToken } = req.params;

    const existingUser = await monooseHelperInstance.getUserById(discordId);

    if (
      !existingUser ||
      existingUser.verificationToken === "" ||
      verificationToken !== existingUser.verificationToken
    ) {
      return res.sendFile(path.join(__dirname, "/clientResponse/404.html"));
    }

    existingUser.verificationToken = "";
    existingUser.isVerified = true;
    await monooseHelperInstance.updateUser(existingUser);
    log("User verified: ", existingUser);

    return res.sendFile(path.join(__dirname, "/clientResponse/verified.html"));
  }
);

const connectToDbAndStartServer = async () => {
  await mongoose.connect(DB_CONNECTION);
  log(`Connected to DB!`);

  app.listen(port, (err?: Error) => {
    if (err) throw new Error(err.message);
    log(`Server ready!`);

    startBot(BOT_TOKEN);

    startCronjob();
  });
};

connectToDbAndStartServer();
