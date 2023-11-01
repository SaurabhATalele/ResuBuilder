import Image from 'next/image'
import styles from './page.module.css'
import Navbar from '@/Components/Navbar/Navbar'
import HomePage from '@/Components/Home/HomePage'

export default function Home() {
  return (
    <>
    <Navbar/>
    <HomePage/>
    </>
  )
}
