import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import { startBot } from "./bot";

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
const DB_CONNECTION = process.env.DB_CONNECTION;

const BOT_TOKEN = process.env.BOT_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

if (!BOT_TOKEN || !CLIENT_ID || !GUILD_ID) {
  throw new Error("Credentials missing");
}

app.use(express.json());

// app.use("/api/users", usersRoute);

app.get(
  "/lean-coffee-email-verification/:email",
  (req: Request, res: Response) => {
    // send response with JWT with expire date
    res.send(req.params.email);
  }
);

app.get(
  "/lean-coffee-email-verification/check-duplicate-user/:id",
  (req: Request, res: Response) => {
    res.send(req.params.id);
  }
);

app.listen(port, (err?: Error) => {
  if (err) throw new Error(err.message);
  console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
});

//   mongoose.connect(
//     DB_CONNECTION,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       dbName: process.env.DB_NAME,
//       useFindAndModify: false,
//     },
//     () => {
//       console.log("connected to db!");

//       app.listen(port, (err?: Error) => {
//         if (err) throw new Error(err.message);
//         console.log(
//           `> Ready on localhost:${port} - env ${process.env.NODE_ENV}`
//         );
//       });
//     }
//   );

startBot(BOT_TOKEN);
