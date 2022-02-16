import { Document, ObjectId } from "mongoose";
import { User, UserModel } from "../models/User";

class MongooseHelper {
  checkExistingEmail = async (emailAdress: string) => {
    return await UserModel.findOne({ email: emailAdress }).exec();
  };

  async saveUser(
    discordUsername: string,
    discordId: string,
    email: string,
    verificationToken: string
  ) {
    const newUser = new UserModel<User>({
      discordUsername,
      discordId,
      email,
      isVerified: false,
      verificationToken,
    });
    await newUser.save();
  }

  async getUserById(id: string) {
    return await UserModel.findOne({ discordId: id }).exec();
  }

  async updateUser(user: Document<unknown, any, User>) {
    await user.save();
  }
}

export const monooseHelperInstance = new MongooseHelper();
