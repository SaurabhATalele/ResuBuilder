import { useState,useEffect } from "react"
import Personal from "@/Components/Modules/Personal"
import Projects from "@/Components/Modules/Projects"
import Academic from "@/Components/Modules/Academic"
import Experience from "@/Components/Modules/Experience"
import styles from './Editor.module.css'
import Link from "next/link"
import Image from "next/image"
import Skills from "../Modules/Skills"
import { getResumeData } from "@/Utils/ApiCalls/getResumeData"
import cookieCutter from 'cookie-cutter'
import Preview from "../Modules/Preview"


const Editor = ({id}) => {
    const [sidebar, setSidebar] = useState(false)
    const [resumeData,setResumeData] = useState({})
    const [resumeName,setResumeName] = useState("")
    const [activeTab, setActiveTab] = useState('personal')
    


    // the function to retrieve the resume data by the id and user 
    const getData = async ()=>{
      const data = await getResumeData({id,user:cookieCutter.get('user')});
      console.log(data);
        setResumeData(data.data)
        setResumeName(data.data.name)
        console.log(data);
        console.log(data.data.name);
    }

    // the use effect to retrieve the data on the first render
    useEffect(() => {
        getData();
        console.log(resumeData);
    }
    , [])

  return (
    <>
    <div className={styles.content__element}>
    <div className={styles.header}>
      {/* Define the sections of your resume as navigation bar  */}
       <ul className={styles.modules__list}>
        <Link className={styles.back__button} href={"/dashboard"}> <Image src={"/icons/back.png"} className={styles.back__icon} width={48} height={48} alt="Back"></Image> Back</Link>
           <li className={activeTab==="personal"?styles.active:""} onClick={()=>setActiveTab("personal")}>Personal</li>
           <li className={activeTab==="experience"?styles.active:""} onClick={()=>{setActiveTab("experience")}}>Experience</li>
           <li className={activeTab==="academic"?styles.active:""}onClick={()=>{setActiveTab("academic")}}>Academic</li>
           <li className={activeTab==="projects"?styles.active:""} onClick={()=>{setActiveTab("projects")}}>Projects</li>
           <li className={activeTab==="skills"?styles.active:""} onClick={()=>{setActiveTab("skills")}}>Skills</li>
           {/* <li className={activeTab==="summary"?styles.active:""}>Summary(Optional)</li> */}
           <li className={activeTab==="preview"?styles.active:""} onClick={()=>setActiveTab('preview')}>Preview</li>
       </ul>

  </div>

  {/* The main content of the editor */}
 <div className={styles.dsh}>
   {activeTab==="personal"&&<Personal id={id} resumeData={resumeData?.data?.personalInfo} getData={getData} setActiveTab={setActiveTab}/>}
   {activeTab==="experience"&&<Experience id={id} resumeData={resumeData?.data?.experience} getData={getData} setActiveTab={setActiveTab}/>}
   {activeTab==="projects"&&<Projects id={id} resumeData={resumeData?.data?.projects} getData={getData} setActiveTab={setActiveTab}/>}
   {activeTab==="academic"&&<Academic id={id} resumeData={resumeData?.data?.education} getData={getData} setActiveTab={setActiveTab}/>}
    {activeTab==="skills"&&<Skills id={id} resumeData={resumeData?.data?.skills} getData={getData} setActiveTab={setActiveTab}/>}
    {activeTab==="preview"&&<Preview resumeData={resumeData?.data} name={resumeName}/>}
 </div> 
 </div>
 </>
  )
}

export default Editor
