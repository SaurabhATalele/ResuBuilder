import { NextResponse } from "next/server";
import { ResumeModel } from "@/utils/backend/ResumeModel";
import { connectDB } from "@/utils/backend/mongoDB";

export async function POST(req, res) {
    const { name,user} = await req.json();
    await connectDB();
    const resume = new ResumeModel({ name,user});
    await resume.save();
    return new NextResponse(
        JSON.stringify({
            success: true,
            message: "Resume created !",
        }),
        {
            status: 200,
        }
    );
    }

