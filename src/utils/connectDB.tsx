import mongoose from "mongoose";

const { URI_MONGODB } = process.env;
export const connectDB = async () => {
  if (URI_MONGODB) return mongoose.connect(URI_MONGODB);
};
