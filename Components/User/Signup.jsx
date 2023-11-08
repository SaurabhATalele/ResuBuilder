'use client'
import styles from './User.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from '@/Utils/ApiCalls/register';


    const userSignup=async (e)=>{
        e.preventDefault();
        const name = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const confirm_password = e.target[3].value;
        const res  = await register({name,email,password,confirm_password})
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
    
      <div className={styles.toast}>
      <ToastContainer />
      </div>
        <h2 className={styles.main__heading}>Welcome to Resume Builder</h2>
        <div className={styles.container}>
            <h1 className={styles.heading} >Register</h1>
                <input type="text" name='name' placeholder='Name' className={styles.input} />
                <input type="text" name='username' placeholder='Username' className={styles.input} />
                <input type="password" name='password' placeholder='Password' className={styles.input} />
                <input type="password" name='confirm_password' placeholder='Confirm Password' className={styles.input} />
            </form>
        </div>
        </div>
    </div>

  )
}

