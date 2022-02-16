import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import path from "path";
import { startBot } from "./utils/bot";
import { monooseHelperInstance } from "./utils/MongoosHelper";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
const DB_CONNECTION = process.env.DB_CONNECTION;

if (!DB_CONNECTION) {
  throw new Error("Database credentials missing");
}

const BOT_TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

if (!BOT_TOKEN || !CLIENT_ID || !GUILD_ID) {
  throw new Error("Discord credentials missing");
}

app.use(express.json());

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

    return res.sendFile(path.join(__dirname, "/clientResponse/verified.html"));
  }
);

mongoose.connect(DB_CONNECTION, () => {
  console.log("connected to db!");

  app.listen(port, (err?: Error) => {
    if (err) throw new Error(err.message);
    console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
  });
});

startBot(BOT_TOKEN);
