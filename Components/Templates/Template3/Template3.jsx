import React,{useState} from 'react'
import styles from './styles.module.css'
import Image from 'next/image'

const Template3 = ({data}) => {
  const [resumeData,setResumeData] = useState(data)
  return (
<div className={styles.resume}>
        
        <header className={styles.header}>
            <h3 className={styles.name}>{resumeData?.personalInfo?.name}</h3>
            <div className={styles.personal__info}>
                <span className={styles.phone}> <Image src={'/images/phone.png'} className={styles.image} width={12} height={12} alt='phone'/> {resumeData?.personalInfo?.phone}</span>
                <span className={styles.email}><Image src={'/images/email.png'} className={styles.image} width={10} height={10} alt='phone'/>{resumeData?.personalInfo?.email}</span>
                <span className={styles.linkedin}><Image src={'/images/linkedin.png'} className={styles.image} width={10} height={10} alt='phone'/>{resumeData?.personalInfo?.linkedin}</span>
            </div>
            
        </header>

        <div className={styles.sections}>

      
                {/* education Section  */}
        <section className={styles.section}>
            <h4 className={styles.heading}>Education</h4>
            <hr/>

            {
                resumeData.education.map((edu)=>{
                    return (<div className={styles.resume__entry} key={resumeData.education._id}>
                    <div className={styles.row__main}>  
                        <div className={styles.entry__name}>{edu.qualification} <small className={styles.specialization}>{edu.specialization}</small></div>
                        <div className={styles.duration}>{edu.duration}</div>
                    </div>
                    <div className={styles.row__main}>  
                    <div className={styles.entry__place}>
                        {edu.institute}
                    </div>
                    <div className={styles.entry__place}>
                       Score: {edu.score}
                        </div>

                    </div>
                        
                    </div>)
                    
                    
                })
            }

                </section>


                {/* Experience Section  */}
                <section className={styles.section}>
            <h4 className={styles.heading}>Experience</h4>
            <hr/>
            {
                resumeData.experience.map((exp)=>{
                    return (<div className={styles.resume__entry} key={resumeData.experience._id}>
                    <div className={styles.row__main}>
                        <div className={styles.entry__name}>{exp.position}</div>
                        <div className={styles.duration}>{exp.duration}</div>
                    </div>
                    <div className={styles.entry__place}>
                        {exp.company}
                    </div>
                    <ul className={styles.points}>
                        {
                            exp.description.map((point)=>{
                                return <li key={point}>{point}</li>
                            })
                        }
                      </ul>  
                    </div>)
                    
                    
                })

            }
                </section>


                {/* Projects Section  */}

                <section className={styles.section}>
            <h4 className={styles.heading}>Projects</h4>
            <hr/>
            {
                resumeData.projects.map((project)=>{
                    return (<div className={styles.resume__entry} key={resumeData.projects._id}>
                    <div className={styles.row__main}>
                        <a href={project.link} className={styles.entry__name}>{project.title}</a>
                    </div>
                    <div className={styles.entry__place}>
                        {project.company}
                    </div>
                    <ul className={styles.points}>
                        {
                            project.description.map((point)=>{
                                return <li key={point}>{point}</li>
                            })
                        }
                      </ul>  
                    </div>)
                    
                    
                })

            }
                </section>

                {/* skill Section */}

                <section className={styles.section}>
            <h4 className={styles.heading}>Skills</h4>
            <hr/>
            <div className={styles.skills}>
                {
                    resumeData.skills.map((skill)=>{
                        return <div className={styles.skill__item} key={skill}> <strong>{skill.tag}</strong>: {skill.skills}</div>
                    })
                }

</div>
</section>

</div>


    </div>

   
  
  )
}

export default Template3
