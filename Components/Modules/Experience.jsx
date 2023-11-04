"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Style.module.css";
import { generatePoint } from "../../Utils/ApiCalls/generatePoint";
import {
  addExperience,
  deleteExperience,
  updateExperience,
} from "../../Utils/ApiCalls/addExperience";
import cookieCutter from "cookie-cutter";
import { ToastContainer,toast } from "react-toastify";


const Experience = ({ id, resumeData, getData, setActiveTab }) => {
  console.log(resumeData);
  const [projects, setProjects] = useState([]);

  const [description, setdescription] = useState([""]);
  const [company, setcompany] = useState("");
  const [position, setPosition] = useState("");
  const [duration, setDuration] = useState("");
  const [pointIndex, setPointIndex] = useState(description.length - 1);
  const [loader, setLoader] = useState(false);

  const [edit, setEdit] = useState("");

  useEffect(() => {
    if (resumeData) {
      setProjects(resumeData);
    }
  }, [resumeData]);

  // Delete the point from the list
  const deletePoint = (index) => {
    const newdescription = [...description];
    newdescription.splice(index, 1);
    setdescription(newdescription);
  };

  // Update the value of the point
  const updateValue = (e) => {
    const newdescription = [...description];
    newdescription[e.target.id] = e.target.value;
    setdescription(newdescription);
  };

  // Function to add the project to list
  const addExperienceHandler = async (e) => {
    e.preventDefault();
    const newProject = {
      id,
      user: cookieCutter.get("user"),
      company: company,
      description: description,
      position,
      duration,
    };
    console.log(newProject);
    const res = await addExperience(newProject);
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
    const newProjects = [...projects];
    newProjects.push(newProject);
    setProjects(newProjects);
    getData();
    setdescription([""]);
    setcompany("");
    setPosition("");
    setDuration("");
  };

  // function to delete the required project from the list
  const deleteExperienceHandler = async (index) => {
    const userResponse = window.confirm("Are you sure to delete?")
    if(!userResponse)return
    const newProjects = [...projects];
    const res = await deleteExperience({ id, expID: projects[index]._id });
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
    newProjects.splice(index, 1);
    setProjects(newProjects);
    getData();
  };

  // function to edit the project
  const editProject = (index) => {
    // console.log(projects);
    setcompany(projects[index].company);
    setPosition(projects[index].position);
    setdescription(projects[index].description);
    setDuration(projects[index].duration);
    setEdit(projects[index]._id);
    // console.log(projects[index].id);
  };

  // update the experiences
  const updateExperienceHandler = async (e) => {
    e.preventDefault();
    const newExperience = {
      id,
      user: cookieCutter.get("user"),
      company: company,
      description: description,
      position,
      duration,
      expID: edit,
    };
    const res = await updateExperience(newExperience);
    // show the toast after updation 
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
    // update the data from database 
    getData();
    const newProjects = [...projects];
    newProjects.push(newExperience);
    setProjects(newProjects);
    setcompany("");
    setPosition("");
    setDuration("");
    setdescription([""]);
    setEdit("");
    console.log(newExperience);
  };

  const generateDescription = async (e) => {
    e.preventDefault();
    if (position.length === 0) {
      alert("Please enter the position");
      return;
    }

    var newdescription = [...description];
    setLoader(true);
    const response = await generatePoint({
      title: position,
      type: "experience",
      description: description,
    });
    const p = response.point.replace("-", "").split(".");
    console.log(p);
    newdescription = [...p];
    setdescription(newdescription);
    setLoader(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.toast}>
      <ToastContainer />
      </div>
      <div className={styles.left__block}>
        <h4>Your Experience</h4>
        {projects.map((project, index) => {
          return (
            <div className={styles.__elem} key={index}>
              <div className={styles.__title}>{project.company}</div>
              <div className={styles.__link}>{project.position}</div>
              <div className={styles.__options}>
                <button
                  className={styles.edit__button}
                  onClick={() => editProject(index)}
                >
                  Edit
                </button>
                <button
                  className={styles.delete__button}
                  onClick={() => deleteExperienceHandler(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.__details}>
        <h4>Add your experience</h4>
        <form className={styles.form__vertical} onSubmit={addExperienceHandler}>
          <div className={styles.input__box}>
            <label htmlFor="title">
              company Name<span className={styles.required__field}>*</span>
            </label>
            <input
              type="text"
              placeholder="company"
              value={company}
              onChange={(e) => setcompany(e.target.value)}
              required
            />
          </div>
          <div className={styles.flex__}>
            <div className={styles.input__box}>
              <label htmlFor="link">Position</label>
              <input
                type="text"
                placeholder="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div className={styles.input__box}>
              <label htmlFor="link">Duration</label>
              <input
                type="text"
                placeholder="Ex. May 2020 - June 2023"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.description__box}>
            <div className={styles.desc}>
              <label htmlFor="description" className={styles.desc__header}>
                Experience Description{" "}
                <button
                  className={styles.ai__generate}
                  onClick={(e) => {
                    e.preventDefault();
                    setdescription([...description, ""]);
                  }}
                >
                  Add
                </button>
              </label>
              <button
                className={styles.ai__generate}
                onClick={generateDescription}
              >
                AI Generate{" "}
                {loader && (
                  <Image
                    src={"/images/loader.png"}
                    width={20}
                    height={20}
                    className={styles.loader}
                    alt="loader"
                  ></Image>
                )}{" "}
              </button>
            </div>

            <ul className={styles.ul}>
              {description.map((point, index) => {
                return (
                  <li className={styles.li} key={index}>
                    <input
                      type="text"
                      id={`${index}`}
                      placeholder="Point"
                      value={point}
                      onChange={updateValue}
                      onFocus={() => setPointIndex(index)}
                      className={styles.point__input}
                    />
                    <button
                      className={styles.delete__point__button}
                      onClick={() => {
                        deletePoint(index);
                      }}
                    >
                      delete
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={styles.buttons__}>
            {!edit && (
              <input
                type="submit"
                className={styles.add_button}
                value="Add Experience"
              />
            )}
            {edit && (
              <button
                className={styles.add_button}
                onClick={updateExperienceHandler}
              >
                Update
              </button>
            )}

            <button
              className={styles.next__button}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("academic");}
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

export default Experience;
