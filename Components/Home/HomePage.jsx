import Image from "next/image"
import styles from "./HomePage.module.css"
import { motion } from "framer-motion"
import Link from "next/link"


const HomePage = () => {
  return (
<>
      <div className={styles.bg}></div>
    <div className={styles.home__container}>
      <div className={styles.intro}>

        <div className={styles.landing__images}>

          <motion.div
          initial={{top:-50,opacity:0}}
          animate={{top:0,opacity:1}} 
          delay={0.5}
          transition={{type:'spring', stiffness: 50}}
          className={styles.home__image__box}
        >
          <Image src={'/images/HomePage/Home (1).jpg'} width={400} height={500} className={styles.home__image} alt="home" />
          </motion.div>
          <motion.div
          initial={{top:150,opacity:0}}
          animate={{top:100,opacity:1}} 
          delay={0.5}
          transition={{type:'spring', stiffness: 50}}
          className={styles.home__image__box}
        >
          <Image src={'/images/HomePage/Home (2).jpg'} width={400} height={500} className={styles.home__image} alt="home"/>

          </motion.div>

          <motion.div
          initial={{left:100,opacity:0}}
          animate={{left:150,opacity:1}} 
          delay={0.5}
          transition={{type:'spring', stiffness: 50}}
          className={styles.home__image__box}
        >
          <Image src={'/images/HomePage/Home (3).jpg'} width={400} height={500} className={styles.home__image} alt="home"/>
          </motion.div>
          <div className={styles.landing__bg}></div>
        </div>
        <div className={styles.home__text}>
            <h1>The way the world makes resumes.
The smartest <span className={styles.unique__text}>AI resume builder</span></h1>
            <p>Experience effortless resume creation with our AI Resume Builder. Instantly craft a standout resume!
            </p>

            <button onClick={
              ()=>{
                window.location.href="/login"
              }
            } className={styles.button} data-hover="Get Started!"><div>Create Your Resume</div></button>

          </div>
      </div>

        
      <div className={styles.highlighter}>
        <h1 className={styles.heading}>Start Building Your resume with<br></br><span className={styles.span}> AI Resume Builder</span></h1>
        <div className={styles.features}>
            <h3>Features</h3>
            <ul>
              <li> <Image src={"/icons/check.png"} width={18} height={18} alt="Check" />AI Content</li>
              <li><Image src={"/icons/check.png"} width={18} height={18} alt="Check" />10+ templates</li>
              <li><Image src={"/icons/check.png"} width={18} height={18} alt="Check" />Easy interface</li>
              <li><Image src={"/icons/check.png"} width={18} height={18} alt="Check" />Free Trial</li>
            </ul>
        </div>
        <Image src={'/SampleResume.jpg'} width={1000} height={1000} className={styles.sample__resume} alt="resume sample"/>
      </div>

      <section className={styles.features__section}>
        <h2 className={styles.section__heading}>Features</h2>
        <div className={styles.features__container}>
          <div className={styles.feature__tile}>
            <Image src={'/icons/suggestion.png'} width={64} height={64} alt="AI" className={styles.feature__image}/>
            <div className={styles.feature__details}>
            <h3 className={styles.feature__heading}>AI Content</h3>
            <p className={styles.feature__desc}>AI Resume Builder uses AI to generate resume content based on your profile.</p>
            </div>
          </div>
          <div className={styles.feature__tile}>
            <Image src={'/icons/template.png'} width={64} height={64} alt="Templates" className={styles.feature__image}/>
            <div className={styles.feature__details}>
            <h3 className={styles.feature__heading}>10+ templates</h3>
            <p className={styles.feature__desc}>Choose from 10+ templates to create your resume.</p>
            </div>
            </div>
          <div className={styles.feature__tile}>
            <Image src={'/icons/easy.png'} width={64} height={64} alt="Easy" className={styles.feature__image} />
            <div className={styles.feature__details}>
            <h3 className={styles.feature__heading}>Easy interface</h3>
            <p className={styles.feature__desc}>A user-friendly interface that guides users through the resume-building process.</p>
            </div>
            </div>

          <div className={styles.feature__tile}>
            <Image src={'/icons/preview.png'} width={64} height={64} alt="Free" className={styles.feature__image}/>
            <div className={styles.feature__details}>
            <h3 className={styles.feature__heading}>Dynamic Editing and Preview</h3>
            <p className={styles.feature__desc}>Real-time preview of the resume as users make edits. </p>
            </div>
            </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <Image src={'/images/sapiens.svg'} width={300} height={200}></Image>
        <div>
          <ul className={styles.links}>
            <li>Home</li>
            <li>Pricing</li>
            <li>About</li>
            <Link href={"/login"}>Login</Link>
          </ul>
        </div>

        <div>
          <ul className={styles.links}>
            <li>Create Resume</li>
            <li>AI Generator</li>
            <li>Resume Score</li>
          </ul>
        </div>


      </footer>


      
    </div>
</>

  )
}

export default HomePage
