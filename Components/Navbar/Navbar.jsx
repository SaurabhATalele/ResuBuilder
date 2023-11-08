import styles from './Navbar.module.css'
import Link from 'next/link'
const Navbar = () => {

  return (
    <div className={styles.navbar}>
      <h3 className={styles.logo}>ResuBuilder</h3>
      <ul className={styles.tabs}>
        {/* <li>Home</li>
        <li>Pricing</li>
        <li>Build</li> */}
        <Link href='/login' className={styles.link}>
        <li className={styles.login__link}>Login</li>
        </Link>
      </ul>
    </div>
  )
}

export default Navbar
