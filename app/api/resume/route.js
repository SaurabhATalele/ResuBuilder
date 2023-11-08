import { NextResponse } from "next/server";
import { ResumeModel } from "@/Utils/Backend/ResumeModel";
import { connectDB } from "@/Utils/Backend/mongoDB";

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

export async function DELETE(req,res){
    const {id} = await req.json();
    const resume = await ResumeModel.findByIdAndDelete({_id:id});
    return new NextResponse(
        JSON.stringify({
            success: true,
            message: "Resume deleted!",
        }),
        {
            status: 200,
        }
    );
}

