import { Schema, model } from "mongoose";

export interface User {
  discordUsername: string;
  discordId: number;
  email: string;
  isVerified: boolean;
}

const userSchema = new Schema<User>(
  {
    discordUsername: {
      type: String,
      required: true,
    },
    discordId: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
    },
  },
  { collection: "users" }
);

export const UserModel = model<User>("users", userSchema);
