import Image from "next/image"
import styles from "./HomePage.module.css"
const HomePage = () => {
  return (

    <div className={styles.home__container}>
      <div className={styles.intro}>

        <Image src={'/Home.png'} width={1000} height={1000} className={styles.image}></Image>
        <div className={styles.home__text}>
            <h1>The way the world makes resumes.
The smartest <span className={styles.unique__text}>AI resume builder</span></h1>
            <p>Experience effortless resume creation with our AI Resume Builder. Instantly craft a standout resume!
            </p>

            <button className={styles.button} data-hover="Get Started!"><div>Create Your Resume</div></button>

          </div>
      </div>

        
      <div className={styles.highlighter}>
        <h1 className={styles.heading}>Start Building Your resume with<br></br><span className={styles.span}>  THE RESUME BUILDER</span></h1>
        <Image src={'/SampleResume.jpg'} width={1000} height={1000} className={styles.sample__resume}></Image>
      </div>

      
    </div>
  )
}

export default HomePage
