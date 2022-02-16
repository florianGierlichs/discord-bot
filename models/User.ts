import { Schema, model } from "mongoose";

export interface User {
  discordUsername: string;
  discordId: string;
  email: string;
  isVerified: boolean;
  verificationToken: string;
}

const userSchema = new Schema<User>(
  {
    discordUsername: {
      type: String,
      required: true,
    },
    discordId: {
      type: String,
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
    verificationToken: {
      type: String,
    },
  },
  { collection: "users", timestamps: true }
);

userSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 3600,
    partialFilterExpression: { isVerified: false },
  }
);

export const UserModel = model<User>("users", userSchema);
