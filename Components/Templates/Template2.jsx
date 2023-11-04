"use client";
import { useState } from "react";
import styles from "./Style.module.css";
import "./Style.module.css";
import Image from "next/image";

const Template2 = ({ data }) => {
  console.log("data is", data.experience);
  const [resumeData, setResumeData] = useState(data);
  return (
    <div className={styles.resume}>
      <header className={styles.header}>
        <h3 className={styles.name}>{resumeData?.personalInfo?.name}</h3>
        <div className={styles.personal__info}>
          <span className={styles.phone}>
            {" "}
            <Image
              src={"/images/white/Phone.png"}
              className={styles.image}
              width={18}
              height={18}
              alt="phone"
            />{" "}
            {resumeData?.personalInfo?.phone}
          </span>
          <span className={styles.email}>
            <Image
              src={"/images/white/email.png"}
              className={styles.image}
              width={18}
              height={18}
              alt="phone"
            />
            {resumeData?.personalInfo?.email}
          </span>
          <span className={styles.linkedin}>
            <Image
              src={"/images/white/linkedin.png"}
              className={styles.image}
              width={18}
              height={18}
              alt="phone"
            />
            {resumeData?.personalInfo?.linkedin}
          </span>
        </div>
      </header>

      {/* education Section  */}
      <section className={styles.section}>
        <h4 className={styles.heading}>Education</h4>
        <hr />

        {resumeData.education.map((edu) => {
          return (
            <div
              className={styles.resume__entry}
              key={resumeData.education._id}
            >
              <div className={styles.row__main}>
                <div className={styles.entry__name}>
                  {edu.qualification}{" "}
                  <small className={styles.specialization}>
                    {edu.specialization}
                  </small>
                </div>
                <div className={styles.duration}>{edu.duration}</div>
              </div>
              <div className={styles.row__main}>
                <div className={styles.entry__place}>{edu.institute}</div>
                <div className={styles.entry__place}>Score: {edu.score}</div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Experience Section  */}
      {resumeData.experience.length >0 &&
      <section className={styles.section}>
        <h4 className={styles.heading}>Experience</h4>
        <hr />
        {resumeData.experience.map((exp) => {
          return (
            <div
              className={styles.resume__entry}
              key={resumeData.experience._id}
            >
              <div className={styles.row__main}>
                <div className={styles.entry__name}>{exp.position}</div>
                <div className={styles.duration}>{exp.duration}</div>
              </div>
              <div className={styles.entry__place}>{exp.company}</div>
              <ul className={styles.points}>
                {exp.description.map((point) => {
                  return <li key={point}>{point}</li>;
                })}
              </ul>
            </div>
          );
        })}
      </section>
    }
      {/* Projects Section  */}
{resumeData.projects && 
      <section className={styles.section}>
        <h4 className={styles.heading}>Projects</h4>
        <hr />
        {resumeData.projects.map((project) => {
          return (
            <div className={styles.resume__entry} key={resumeData.projects._id}>
              <div className={styles.row__main}>
                <a href={project.link} className={styles.entry__name}>
                  {project.title}
                </a>
              </div>
              <div className={styles.entry__place}>{project.company}</div>
              <ul className={styles.points}>
                {project.description.map((point) => {
                  return <li key={point}>{point}</li>;
                })}
              </ul>
            </div>
          );
        })}
      </section>
    }
      {/* skill Section */}

      <section className={styles.section}>
        <h4 className={styles.heading}>Skills</h4>
        <hr />
        <div className={styles.resume__entry}>
          {resumeData.skills.map((skill) => {
            return (
              <div className={styles.entry__place} key={skill}>
                {" "}
                <strong>{skill.tag}</strong>: {skill.skills}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Template2;
