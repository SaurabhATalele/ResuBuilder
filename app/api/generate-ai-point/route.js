import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function POST(req, res) {
  try {
    // console.log(await req.json());
    const { type, title ,points} = await req.json();
    // console.log(title,points);
    var prompt = "";
    if(type === "project"){
      prompt = `generate a description of ${title} which has more accuracy and have all the aspects covered which are important. Generate this as a point 
      which has 20 words at most. The description should be proper for including in resume. It should have a quantifying impact through numbers and should have action verb in it`
    }
    else if(type === "experience"){
        prompt = `generate a work description of ${title} job role which has more accuracy and have all the aspects covered which are important. Generate this as a point 
      which has 20 words at most. The description should be proper for including in resume. give at least 3 points in list format without numbering also should not have - which has quantifying impact through numbers and should have action verb in it`
    }
    if (!title || !type)
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "Incomplete data",
        }),
        {
          status: 400,
        }
      );
    const gptResponse = await openai.chat.completions.create(
        {
      model :"gpt-3.5-turbo",
      messages :[{ role: "user", content: prompt }]
        }
    );
    console.log(gptResponse);
    return new NextResponse(
      JSON.stringify({
        success: true,
        message: "Generated point",
        point: gptResponse.choices[0].message.content,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({
        success: false,
        error: "Something went wrong",
      }),
      {
        status: 500,
      }
    );
  }
}
