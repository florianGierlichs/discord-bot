import { UserModel } from "../models/User";

class MongooseHelper {
  checkExistingEmail = async (emailAdress: string) => {
    return await UserModel.findOne({ email: emailAdress }).exec();
  };
}

export const monooseHelperInstance = new MongooseHelper();
