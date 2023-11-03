'use client'
import { login } from '@/Utils/ApiCalls/login'
import styles from './User.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation'
import cookieCutter from  'cookie-cutter'

const Login = () => {
  const router = useRouter()

  const userLogin=async (e)=>{
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const res  = await login({email,password})
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
        })
        
       if(res.message){
        cookieCutter.set('user',res.user.id)
        // localStorage.setItem('User',res.user)
        router.push('/dashboard')
       }

  } 
  return (
    
    <div className={styles.loginpage}>
      <div className={styles.toast}>
      <ToastContainer />
      </div>
        <h2 className={styles.main__heading}>Welcome to Resume Builder</h2>
        <div className={styles.loginpage__overlay}>
            <Image src='/Login.svg' width={500} height={500} alt='loginImage' className={styles.image} />
        <div className={styles.container}>
            <h1 className={styles.heading}>Login</h1>
            <form className={styles.loginform} onSubmit={userLogin}>
              <div className={styles.input__box}>
                <label htmlFor="email">Email</label>
                <input type="email" name='email' placeholder='Email' className={styles.input} />
              </div>
              <div className={styles.input__box}>
                <label htmlFor="passwd">Password</label>
                <input type="password" name='password' placeholder='password' className={styles.input} />
              </div>
                <button type='submit' className={styles.login_button}>Login</button>
            </form>
            <p className={styles.p}>Don't have an account? <Link href={"/signup"} className={styles.link}>Register</Link></p> 

        </div>
        </div>
    </div>

  )
}

export default Login
