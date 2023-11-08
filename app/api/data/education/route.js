import { NextResponse } from 'next/server';
import { ResumeModel } from '@/Utils/Backend/ResumeModel';  
import { connectDB } from '@/Utils/Backend/mongoDB';

export const POST = async (req, res) => {
    try {
        const { id, user, qualification, institute, specialization,duration,score } = await req.json();
        if (!id)
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    error: 'Incomplete data'
                }),
                {
                    status: 400
                }
            );
        await connectDB();
        const options = { new: true, upsert: true };
        await ResumeModel.findOneAndUpdate({ _id: id, user }, {
            $push:{

                'data.education': {
                    qualification, institute, specialization,duration,score
                }
            }
        }, options);
        return new NextResponse(
            JSON.stringify({
                success: true,
                message: 'Academic Info Saved Successfully'
            }),
            {
                status: 200
            }
        );
    }
    catch (error) {
        return new NextResponse(
            JSON.stringify({
                success: false,
                error: error.message
            }),
            {
                status: 500
            }
        );
    }
}


export const DELETE = async (req, res) => {
    try {
        const { id, eduID } = await req.json();
        if (!id)
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    error: 'Incomplete data'
                }),
                {
                    status: 400
                }
            );
        await connectDB();
        const options = { new: true, upsert: true };
        await ResumeModel.findOneAndUpdate({ _id: id }, {
            $pull: {
                'data.education': {
                    _id: eduID
                }
            }
        }, options);
        return new NextResponse(
            JSON.stringify({
                success: true,
                message: 'Academic Info Saved Successfully'
            }),
            {
                status: 200
            }
        );
    }
    catch (error) {
        return new NextResponse(
            JSON.stringify({
                success: false,
                error: error.message
            }),
            {
                status: 500
            }
        );
    }
}


export const PUT = async (req, res) => {
    try {
        const { id, eduID, qualification, institute, specialization,duration,score } = await req.json();
        if (!id)
            return new NextResponse(
                JSON.stringify({
                    success: false,
                    error: 'Incomplete data'
                }),
                {
                    status: 400
                }
            );
        await connectDB();
        const options = { new: true, upsert: true };
        const res = await ResumeModel.findOneAndUpdate({ _id: id, "data.education._id":eduID }, {
            $set:{
                'data.education.$': {
                    qualification, institute, specialization,duration,score
                }
            }
        }, options);
        return new NextResponse(
            JSON.stringify({
                success: true,
                message: 'Academic Info Saved Successfully'
            }),
            {
                status: 200
            }
        );
    }
    catch (error) {
        return new NextResponse(
            JSON.stringify({
                success: false,
                error: error.message
            }),
            {
                status: 500
            }
        );
    }
}