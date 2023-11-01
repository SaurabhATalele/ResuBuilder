import { NextResponse } from "next/server";
import { ResumeModel } from "@/Utils/Backend/ResumeModel";

import { connectDB } from "@/Utils/Backend/mongoDB";

export const POST = async (req, res) => {
    try {
        const { id, user, tag, skills } = await req.json();
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
        const options = { new: true, upsert: true };
        await ResumeModel.findByIdAndUpdate(
        { _id: id, user },{
       
            $push: {
            "data.skills": {
            tag,
            skills
            },
        }
        },
        options
        );
        return new NextResponse(
        JSON.stringify({
            success: true,
            message: "Skills Saved Successfully",
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

export const DELETE = async (req, res) => {
    try {
        const { id, user, skill } = await req.json();
        console.log(id,user,skill);
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
        const options = { new: true};
        const res = await ResumeModel.findOneAndUpdate(
        { _id: id, user },{
       
            $pull: { 'data.skills': { _id: skill } }
     
    },
        options
        );
        console.log(res);
        return new NextResponse(
        JSON.stringify({
            success: true,
            message: "Skill Deleted Successfully",
        }),
        {
            status: 200,
        }
        );
    } catch (error) {
        console.log(error);
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


export const PUT = async (req, res) => {
    try {
        const { id, user, skill, tag, skills } = await req.json();
        console.log(id,user,skills,skill,tag);
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
        const options = { new: true, upsert: true };
        await ResumeModel.findOneAndUpdate(
        { _id: id, user,'data.skills._id': skill },
        {
            $set: {
                'data.skills.$': {
                    tag,skills
                }
            },
        },
        options
        );
        return new NextResponse(
        JSON.stringify({
            success: true,
            message: "Skill Updated Successfully",
        }),
        {
            status: 200,
        }
        );
    } catch (error) {
        console.log(error);
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
