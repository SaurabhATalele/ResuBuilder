'use client'

import Editor from "@/Components/Editor/Editor"



function page({params}){
    const id = params.id

    return (
        <Editor id={id}/>
    )
}

export default page
