import { FilterQuery } from "mongoose";
import { omit } from "lodash";
import UserModel, { UserDocument, UserInput } from "../models/user.model";
import faktory from "faktory-worker";

export async function createUser({email, name}: UserInput) {
  try {
    /*
    const client = await faktory.connect({
      host: "faktory.prod2.notepad.local",
      port: 7419,
      password: '12345',
      labels: [],
    })
    console.log('ResizeImage');
    await client.job("ResizeImage", { id: 399, size: "thumb" }).push();
    await client.close();
    */
    
    const user = await UserModel.create({email, name});
    return user.toJSON();
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}

export async function getUsers() {
  return UserModel.find();
}