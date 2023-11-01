import { NextResponse } from "next/server";
import { ResumeModel } from "@/utils/backend/ResumeModel";
import { connectDB } from "@/utils/backend/mongoDB";
export async function POST(req, res) {
    const { user} = await req.json();
    console.log(user);
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