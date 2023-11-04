"use client";
import { useEffect, useState } from "react";
import styles from "./Style.module.css";
import {
  addEducation,
  deleteEducation,
  updateEducation,
} from "@/Utils/ApiCalls/Education";
import cookieCutter from "cookie-cutter";
const Academic = ({ id, resumeData, getData,setActiveTab }) => {
  const [education, setEducation] = useState([]);
  const [qualification, setQualification] = useState("");
  const [institute, setinstitute] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [duration, setDuration] = useState("");
  const [score, setScore] = useState("");
  const [edit, setEdit] = useState("");

  useEffect(() => {
    if (resumeData) {
      setEducation(resumeData);
    }
  }, [resumeData]);

  const addEducationHandler = async (e) => {
    e.preventDefault();
    const newEducation = {
      id,
      user: cookieCutter.get("user"),
      qualification,
      institute,
      specialization,
      duration,
      score,
    };

    await addEducation(newEducation);
    getData();
    const newEducations = [...education];
    newEducations.push(newEducation);
    setEducation(newEducations);
    setQualification("");
    setinstitute("");
    setSpecialization("");
    setDuration("");
    setScore("");
  };

  // update the education details
  const updateEducationHandler = async (e) => {
    e.preventDefault();
    const newEducation = {
      id,
      user: cookieCutter.get("user"),
      qualification,
      institute,
      specialization,
      duration,
      score,
      eduID: edit,
    };

    await updateEducation(newEducation);
    getData();
    const newEducations = [...education];
    newEducations.push(newEducation);
    setEducation(newEducations);
    setQualification("");
    setinstitute("");
    setSpecialization("");
    setDuration("");
    setScore("");
    setEdit("");
  };

  // function to delete the required project from the list
  const deleteEducationHandler = async (index) => {
    console.log(education[index]._id);
    const res = await deleteEducation({ id, eduID: education[index]._id });
    getData();
    console.log("response is :", res);
    const newEducation = [...education];
    newEducation.splice(index, 1);
    setEducation(newEducation);
  };

  // function to edit the project
  const editEducation = (index) => {
    setQualification(education[index].qualification);
    setinstitute(education[index].institute);
    setSpecialization(education[index].specialization);
    setDuration(education[index].duration);
    setScore(education[index].score);
    setEdit(education[index]._id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left__block}>
        <h4>Your Academic Details</h4>
        {education.map((edu, index) => {
          return (
            <div className={styles.__elem} key={index}>
              <div className={styles.__title}>{edu.qualification}</div>
              <div className={styles.__link}>{edu.institute}</div>
              <div className={styles.__options}>
                <button
                  className={styles.edit__button}
                  onClick={() => editEducation(index)}
                >
                  Edit
                </button>
                <button
                  className={styles.delete__button}
                  onClick={() => deleteEducationHandler(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.__details}>
        <h4>Add your project education</h4>
        <form className={styles.form__vertical} onSubmit={addEducationHandler}>
          <div className={styles.input__box}>
            <label htmlFor="title">
              Qualification <span className={styles.required__field}>*</span>
            </label>
            <input
              type="text"
              placeholder="Ex. Bachelor of Technology"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              required
            />
          </div>
          <div className={styles.input__box}>
            <label htmlFor="link">institute/College/University</label>
            <input
              type="text"
              placeholder="Enter institute/College/University"
              value={institute}
              onChange={(e) => setinstitute(e.target.value)}
            />
          </div>
          <div className={styles.input__box}>
            <label htmlFor="link">Specialization</label>
            <input
              type="text"
              placeholder="Ex. Computer Engineering"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />
          </div>
          <div className={styles.flex__}>
            <div className={styles.input__box}>
              <label htmlFor="link">Duration</label>
              <input
                type="text"
                placeholder="Ex. Aug 2020-Dec 2024"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div className={styles.input__box}>
              <label htmlFor="link">Score</label>
              <input
                type="text"
                placeholder="Ex. 9.5 CGPA"
                value={score}
                onChange={(e) => setScore(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.buttons__}>
            {!edit &&
            <input
              type="submit"
              className={styles.add_button}
              value="Add Education"
            />
            }
            {edit && (
              <button
                className={styles.add_button}
                onClick={updateEducationHandler}
              >
                Edit
              </button>
            )}

            <button
              className={styles.next__button}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("projects");
              }}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Academic;
