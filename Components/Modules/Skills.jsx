import { useState, useEffect } from "react";
import styles from "./Style.module.css";
import { addSkill, deleteSkill, updateSkill } from "@/Utils/ApiCalls/Skills";
import cookieCutter from "cookie-cutter";
import { ToastContainer,toast } from "react-toastify";


const Skills = ({ id, resumeData, getData,setActiveTab }) => {
  const [skills, setSkills] = useState([]);

  const [tag, setTag] = useState("");
  const [skill, setSkill] = useState("");
  const [edit, setEdit] = useState("");

  useEffect(() => {
    if (resumeData) {
      setSkills(resumeData);
    }
  }, [resumeData]);

  // edit the skills
  const editSkills = (index) => {
    setTag(skills[index].tag);
    setSkill(skills[index].skills);
    setEdit(skills[index]._id);
  };

  // delete the skills
  const deleteSkillHandler = async (index) => {
    const userResponse = window.confirm("Are you sure to delete?")
    if(!userResponse)return
    const skill = skills[index]?._id

    const res = await deleteSkill({
      id,
      user: cookieCutter.get("user"),
      skill
    });
    res.error ? toast.error(res.error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }) :
    toast.success(res.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    getData();
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setSkills(newSkills);
  };

  const updateSkills = async (e) => {
    e.preventDefault();
    const newSkill = {
      id,
      user: cookieCutter.get("user"),
      tag,
      skills: skill,
      skill: edit,
    };
    const res = await updateSkill(newSkill);
    res.error ? toast.error(res.error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }) :
    toast.success(res.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    getData();
    setTag("");
    setSkill("");
    setEdit("");
  };

  // add the skills
  const addSkills = async (e) => {
    e.preventDefault();
    const newSkill = {
      id,
      user: cookieCutter.get("user"),
      tag,
      skills: skill,
    };
    const res = await addSkill(newSkill);
    res.error ? toast.error(res.error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }) :
    toast.success(res.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    getData();
    const newSkills = [...skills];
    newSkills.push(newSkill);
    setSkills(newSkills);
    setTag("");
    setSkill("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.toast}>
      <ToastContainer />
      </div>
      <div className={styles.left__block}>
      <h4>Your Skills</h4>
        {skills.length === 0 ? (
          <h4>No Skills Added</h4>
        ) : (
          skills.map((skill, index) => {
            return (
              <div className={styles.__elem} key={index}>
                <div className={styles.__title}>{skill.tag}</div>
                <div className={styles.__link}>{skill.skills}</div>
                <div className={styles.__options}>
                  <button
                    className={styles.edit__button}
                    onClick={() => editSkills(index)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.delete__button}
                    onClick={() => deleteSkillHandler(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <div className={styles.__details}>
        <h4>Add your skills</h4>
        <form className={styles.form__vertical} onSubmit={addSkills}>
          <div className={styles.input__box}>
            <label htmlFor="Tag">Tag Name</label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Ex. Programming Languages"
              required
            />
          </div>
          <div className={styles.input__box}>
            <label htmlFor="skills">Skills</label>
            <input
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="Ex. Python, Java, etc."
              required
            />
          </div>
          <div className={styles.buttons__}>
            {
              !edit &&
            <button className={styles.add_button}>Add</button>
            }
            {
              edit &&
                <button className={styles.add_button} onClick={updateSkills}>
              Edit
            </button>
            }

<button
              className={styles.next__button}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("preview");}
              }
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Skills;
