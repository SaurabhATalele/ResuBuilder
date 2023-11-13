'use client'
import styles from './Sidebar.module.css'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import cookieCutter from 'cookie-cutter'
const Sidebar = ({sidebar,setSidebar}) => {
    const [tab, setTab] = useState(1)
    const router = useRouter()

    const logout = ()=>{
        cookieCutter.set('user','')
        router.push('/')
    }

  return (
    <>
        <Image src={'/icons/Menu.png'} width={48} height={48} alt='menu Button' className={styles.menu__button} onClick={()=>{
            setSidebar(!sidebar)}}/>
    <div className={`${styles.sidebar} ${sidebar?styles.sidebar__open:styles.sidebar__close}`}>
        <h1 className={styles.logo}>ResuBuilder</h1>
      <div className={styles.options__menu}>
        <ul>
            <li className={tab===1?styles.active__tab:"None"} onClick={()=>setTab(1)}><Image src={"/icons/HomeIcon.png"} width={96} height={96} className={styles.icon}/> Dashboard</li>
            <li className={tab===2?styles.active__tab:'None'} onClick={()=>setTab(2)}><Image src={"/icons/user.png"} width={96} height={96} className={styles.icon}/> Account</li>
            <li className={tab===3?styles.active__tab:'None'} onClick={()=>setTab(3)}><Image src={"/icons/credits.png"} width={96} height={96} className={styles.icon}/> Buy Credits</li>
        </ul>
      </div>
      <div className={styles.logout} onClick={logout}>
            <Image src={"/icons/logout.png"} width={96} height={96} className={styles.logout__icon}/> Logout
      </div>
    </div>
    </>
  )
}

export default Sidebar
