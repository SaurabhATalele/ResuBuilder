'use client'
import React from 'react'
import styles from './Resumes.module.css'
import { useState } from 'react';
import AddResumeModal from '../Modals/AddResumeModal';
import Image from 'next/image';
import Link from 'next/link';

const Resumes = ({resumes,refresh}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };
    
      const handleNameSubmit = (name) => {
        setUserName(name);
      };

  return (
    <div className={styles.resumes}>
        <h1 className={styles.heading}> Your Resumes</h1>
        <div className={styles.resume__container}>
        <button className={styles.create__button} onClick={openModal}>Create New Resume</button>
        <AddResumeModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onSubmit={refresh}
      />
      <div className={styles.resume__list}>
      {
        resumes?
          resumes.map((resume)=>{
              return(
                <div className={styles.resume__card} key={resume._id}>
                <p className={styles.resume__name}>{resume.name}</p>
                <p className={styles.resume__date}>{resume.createdAt}</p>
                <div className={styles.buttons}>

                <Link href={`/resume/${resume._id}`} className={styles.resume__edit}><Image src={"/icons/edit.png"} width={18} height={18} alt='edit'/> </Link>
                <button className={styles.resume__delete}> <Image src={"/icons/trash.png"} width={18} height={18} alt='trash'/>  </button>
                </div>
            </div>
              )
          }):
          <h4>You don't have any resume. Create one</h4>
      }
      </div>
        </div>
    </div>
  )
}

export default Resumes
