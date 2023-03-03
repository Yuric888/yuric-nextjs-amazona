import { connectDB } from "@/utils/connectDB";
import User from "@/models/User";
import Product from "@/models/Product";
import { data } from "@/utils/data";

export default async function handle(req, res) {
  console.log("Connecting DB");
  await connectDB();
  console.log("DB connected");
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.products);

  res.send({ message: "seeded successfully" });
}
