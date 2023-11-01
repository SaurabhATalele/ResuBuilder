import { NextResponse } from "next/server";
import { ResumeModel } from "@/Utils/Backend/ResumeModel";
import { connectDB } from "@/Utils/Backend/mongoDB";

// create a post function that gets the data from the appId from the request 
// and returns the data from the database
export async function POST(req, res) {
  try {
    const { id,user } = await req.json();
    if (!id)
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
    let data = await ResumeModel.findOne({ _id:id,user }).select("+data");
    if (!data)
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "Invalid credentials",
        }),
        {
          status: 400,
        }
      );
    return new NextResponse(
      JSON.stringify({
        success: true,
        data: data,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
      }
    );
  }
}
