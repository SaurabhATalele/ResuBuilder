'use client'
import {useState,useEffect} from 'react'
import styles from './Style.module.css'
import { addPersonalInfo } from '@/Utils/ApiCalls/addPErsonalInfo';
import cookieCutter from  'cookie-cutter'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Personal = ({id,resumeData,setActiveTab}) => {
    const [data,setData] = useState({name:'',email:'',phone:'',linkedin:'',personalSite:'',country:'',state:'',city:''})
    useEffect(() => {
        console.log("resumedata",resumeData);
        if(resumeData){
            setData(resumeData)
            // console.log("daa",data);
        }
    }, [resumeData])

    const addPersonalInfoHandler = async (e) => {
        e.preventDefault();
        const newData = {...data,user:cookieCutter.get('user'),id:id}
        const res = await addPersonalInfo(newData);
        res.error ? toast.error(res.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }) :
        toast.success(res.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

    }
  return (
    <div className={styles.container}>
        <div className={styles.toast}>
      <ToastContainer />
      </div>
     <form className={styles.form__} onSubmit={addPersonalInfoHandler}>
        <div className={styles.input__box}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={data.name} onChange={(e)=>setData({...data,name:e.target.value})} placeholder="Enter your name"/>
        </div>
        <div className={styles.input__box}>
            <label htmlFor="Email">Email</label>
            <input type="email" name="email" id="name" placeholder="Enter your email" value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}/>
        </div>
        <div className={styles.input__box}>
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" name="phone" id="name" placeholder="+91000000000" value={data.phone} onChange={(e)=>setData({...data,phone:e.target.value})}/>
        </div>
        <div className={styles.input__box}>
            <label htmlFor="linkedin">LinkedIn URL</label>
            <input type="text" name="linkedin" id="linkedin" placeholder="https://www.linkedin.com/in/your_id" value={data.linkedin} onChange={(e)=>setData({...data,linkedin:e.target.value})}/>
        </div>
        <div className={styles.input__box}>
            <label htmlFor="site">Personal site</label>
            <input type="text" name="site" id="site" placeholder="Enter your website URL" value={data.personalSite} onChange={(e)=>setData({...data,personalSite:e.target.value})}/>
        </div>
        <div className={styles.input__box}>
            <label htmlFor="Country">Country</label>
            <input type="text" name="country" id="country" placeholder="Eg. India" value={data.country} onChange={(e)=>setData({...data,country:e.target.value})}/>
        </div>
        <div className={styles.input__box}>
            <label htmlFor="state">State</label>
            <input type="text" name="state" id="state" placeholder="Eg. Maharashtra" value={data.state} onChange={(e)=>setData({...data,state:e.target.value})}/>
        </div>
        <div className={styles.input__box}>
            <label htmlFor="City">City</label>
            <input type="text" name="City" id="City" placeholder="Eg. Pune" value={data.city} onChange={(e)=>setData({...data,city:e.target.value})}/>
        </div>

        <div className={styles.buttons__}>
            <button className={styles.next__button} onClick={()=>setActiveTab("experience")}>Next</button>
            <button className={styles.save__button}>Save</button>
        </div>
     </form>
    </div>
  )
}

export default Personal
