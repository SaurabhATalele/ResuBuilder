import { NextResponse } from "next/server";
import { ResumeModel } from "@/Utils/Backend/ResumeModel";
import { connectDB } from "@/Utils/Backend/mongoDB";

export const POST = async (req, res) => {
    try {
        const { id,user,company,position,duration,description } = await req.json();
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
        await ResumeModel.findOneAndUpdate({ _id:id,user }, {
            $push:{

                'data.experience': {
                    company: company,
                    position,
                duration,
                description
            }
        }
        },options);

        return new NextResponse(
            JSON.stringify({
                success: true,
                message: "Experience Saved Successfully"
            }),
            {
                status: 200,

            }
        );

    }
    catch (error) {
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
        const { id,expID } = await req.json();
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
        const res = await ResumeModel.findOneAndUpdate({ _id:id }, {
            $pull: {
                'data.experience': {
                    _id:expID
                }
            }
        },options);
                return new NextResponse(
            JSON.stringify({
                success: true,
                message: "Experience Deleted Successfully"
            }),
            {
                status: 200,

            }
        );

    }
    catch (error) {
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
        const { id,user,expID,company,position,duration,description } = await req.json();
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
        const res = await ResumeModel.findOneAndUpdate({ _id:id,user,"data.experience._id":expID }, {
            $set:{
                'data.experience.$': {
                    company,
                    position,
                    duration,
                    description
                }
            }
        },options);
                return new NextResponse(
            JSON.stringify({
                success: true,
                message: "Experience Updated Successfully"
            }),
            {
                status: 200,

            }
        );

    }
    catch (error) {
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
