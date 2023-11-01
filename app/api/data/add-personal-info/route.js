import { NextResponse } from "next/server";
import { connectDB } from "@/Utils/Backend/mongoDB";
import { ResumeModel } from "@/Utils/Backend/ResumeModel";


export async function POST(req, res) {
    try{
        const { user,id,name,email,phone,linkedin,personalSite,country,state,city } = await req.json();
        const options = { upsert: true, new: true, setDefaultsOnInsert: true };
        if(!name || !email || !phone || !linkedin || !personalSite || !country || !state || !city)
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
        await ResumeModel.findOneAndUpdate({_id:id,user}, {
            'data.personalInfo': {
                name,
                email,
                phone,
                linkedin,
                personalSite,
                country,
                state,
                city
            }
        },options);
        
        return new NextResponse(
            JSON.stringify({
                success: true,
                message: "Personal Info Saved Successfully"
            }),
            {
                status: 200,
               
            }
        );

    }
    catch(error){
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
