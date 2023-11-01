'use client'
import React, { useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import styles from './Dashboard.module.css'
import { useState } from 'react'
import Resumes from '../Resumes/Resumes'
import {useRouter} from 'next/navigation'
import cookieCutter from 'cookie-cutter'
import { getAllResumes } from '@/Utils/ApiCalls/getAllResumes'
const Dashboard = () => {
    const [sidebar, setSidebar] = useState(false)
    const [activeTab, setActiveTab] = useState('personal')
    const router = useRouter()
    const [resumes,setResumes] = useState([])

    const getResume = async ()=>{
        var res = await getAllResumes({user:cookieCutter.get('user')})
        res = await res.resume.filter((resume)=>resume.user._id===cookieCutter.get('user'))
        console.log(res);
        await setResumes(res)
        return res
    }

    useEffect(() => {
        document.title = 'Dashboard'
        if(!cookieCutter.get('user')){
            router.push('/')
        }
        else{
          const usr = (cookieCutter.get('user'))
          const resume =  getResume()
          console.log(resumes);
        }
    }, [])

  return (
    <div className={styles.dashboard}>
        <div className={`${styles.sidebar__elem} ${sidebar?styles.open__sidebar:styles.close__sidebar}`}>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        </div>
        <div className={styles.content__element}>

        
      <Resumes resumes={resumes} refresh={getResume}/>
        </div>
    </div>
  )
}

export default Dashboard
