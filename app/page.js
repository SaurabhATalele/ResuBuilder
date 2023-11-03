'use client'
import Navbar from '@/Components/Navbar/Navbar'
import HomePage from '@/Components/Home/HomePage'
import cookieCutter from 'cookie-cutter'
import {useRouter} from 'next/navigation'
import { useEffect } from 'react'


export default function Home() {
  const router = useRouter()
  useEffect(()=>{
    if(cookieCutter.get('user')){
      router.push('/dashboard')
    }
  }
  ,[]
  )
  return (
    <>
    <Navbar/>
    <HomePage/>
    </>
  )
}
