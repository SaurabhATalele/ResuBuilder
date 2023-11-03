import { NextResponse } from "next/server";
import { UserModel } from "@/Utils/Backend/UserModel";
import { connectDB } from "@/Utils/Backend/mongoDB";
import bcrypt from "bcryptjs";


export async function POST(req, res) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password)
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "Incomplete data",
        }),
        {
          status: 400,
        }
      );

    await connectDB();

    let user = await UserModel.findOne({ email });
    if (user)
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "User already exists",
        }),
        {
          status: 400,
        }
      );
    const hashedPassword=await bcrypt.hash(password.toString(),10);
    user = await UserModel.create({ name, email, password:hashedPassword });

    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "User created !",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: error.message.toString(),
      }),
      {
        status: 500,
      }
    );
  }
}