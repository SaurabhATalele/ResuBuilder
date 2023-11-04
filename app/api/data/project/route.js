import { NextResponse } from "next/server";
import { ResumeModel } from "@/Utils/Backend/ResumeModel";
import { connectDB } from "@/Utils/Backend/mongoDB";

export const POST = async (req, res) => {
  try {
    const { id, user, title, link, description } = await req.json();
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
      { _id: id, user },
      {
        $push:{
          "data.projects": {
            title,
            link,
            description,
          },
        }
      },
      options
    );
    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Project Saved Successfully",
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
};


export const PUT = async (req, res) => {
  try {
      const { id, user, title,link,description,project } = await req.json();
      console.log(id,user,title,link,description,project);
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
      { _id: id, user,'data.projects._id': project },
      {
          $set: {
              'data.projects.$': {
                title,
                link,
                description,
              }
          },
      },
      options
      );
      return new NextResponse(
      JSON.stringify({
          success: true,
          message: "Project Updated Successfully",
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



export const DELETE = async (req, res) => {
    try {
        const { id, user, project } = await req.json();
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
        { _id: id, user },
        {
            $pull: {
            "data.projects": {
                _id: project,
            },
            },
        },
        options
        );
        return new NextResponse(
        JSON.stringify({
            success: true,
            message: "Project Deleted Successfully",
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