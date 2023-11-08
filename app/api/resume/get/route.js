import { NextResponse } from "next/server";
import { ResumeModel } from "@/Utils/Backend/ResumeModel";
import { connectDB } from "@/Utils/Backend/mongoDB";
export async function POST(req, res) {
    const { user} = await req.json();
    await connectDB();
    const resume = await ResumeModel.find({user}).populate('user');
    return new NextResponse(
        JSON.stringify({
            success: true,
            resume,
        }),
        {
            status: 200,
        }
    );
    }