// components/NameInputModal.js

import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './AddResumeModal.module.css';
import { createNewResume } from '@/Utils/ApiCalls/createNewResume';
import cookieCutter from  'cookie-cutter'


// Modal.setAppElement('app');

const AddResumeModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [name, setName] = useState('');

  const handleSubmit = async () => {
      try{
        const reponse = await createNewResume({name,user:cookieCutter.get('user')});
        alert("Resume Created");
        onSubmit();
        onRequestClose();
      }
      catch(error){
          console.log(error);
      }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create New Resume"
      className={styles.modal}
    >
      <h2>Enter Resume Name</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className={styles.buttons}>

      <button onClick={handleSubmit}>Create</button>
      <button onClick={onRequestClose} className={styles.btn__red}>Cancel</button>
      </div>
    </Modal>
  );
};

export default AddResumeModal;
