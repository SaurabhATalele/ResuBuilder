"use client";
import { useEffect, useState } from "react";
import styles from "./Style.module.css";
import Image from "next/image";
import { generatePoint } from "../../Utils/ApiCalls/generatePoint";
import {
  addProject,
  deleteProject,
  updateProject,
} from "@/Utils/ApiCalls/Projects";
import cookieCutter from "cookie-cutter";
import { ToastContainer,toast } from "react-toastify";
const Projects = ({ id, resumeData, getData,setActiveTab }) => {
  const [projects, setProjects] = useState([]);

  const [description, setdescription] = useState([""]);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [pointIndex, setPointIndex] = useState(description.length - 1);
  const [edit, setEdit] = useState("");
  const [loader, setLoader] = useState(false);

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

  const updateProjectHandler = async (e) => {
    e.preventDefault();
    const newData = {
      id,
      user: cookieCutter.get("user"),
      title,
      link,
      description,
      project: edit,
    };
    const res = await updateProject(newData);
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
    console.log(res);
    setTitle("");
    setLink("");
    setdescription([]);
    setEdit("");
  };

  // Function to add the project to list
  const addProjectHandler = async (e) => {
    e.preventDefault();
    const newProject = {
      id,
      user: cookieCutter.get("user"),
      title: e.target[0].value,
      description: description,
      link: e.target[1].value,
    };
    const res = await addProject(newProject);
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
    console.log(res);
    const newProjects = [...projects];
    newProjects.push(newProject);
    setProjects(newProjects);
    setdescription([""]);
    setTitle("");
    setLink("");
  };

  // function to delete the required project from the list
  const deleteProjectHandler = async (index) => {
    const userResponse = window.confirm("Are you sure to delete?")
    if(!userResponse)return
    const res = await deleteProject({ id, project: projects[index] });
    getData();
    console.log(res);
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

  // function to edit the project
  const editProject = (index) => {
    setTitle(projects[index].title);
    setLink(projects[index].link);
    setdescription(projects[index].description);
    setEdit(projects[index]._id);
  };

  // generate the description point
  const generateDescription = async (e) => {
    e.preventDefault();
    if (title.length === 0) {
      alert("Please enter the title");
      return;
    }
    const newdescription = [...description];
    setLoader(true);
    const response = await generatePoint({
      title: title,
      type: "project",
      description: description,
    });
    newdescription[pointIndex] = response.point;
    setdescription(newdescription);
    setLoader(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.toast}>
      <ToastContainer />
      </div>
      <div className={styles.left__block}>
        <h4>Your Projects</h4>
        {projects.map((project, index) => {
          return (
            <div className={styles.__elem} key={index}>
              <div className={styles.__title}>{project.title}</div>
              <div className={styles.__link}>{project.link}</div>
              <div className={styles.__options}>
                <button
                  className={styles.edit__button}
                  onClick={() => editProject(index)}
                >
                  Edit
                </button>
                <button
                  className={styles.delete__button}
                  onClick={() => deleteProjectHandler(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.__details}>
        <h4>Add your project</h4>
        <form className={styles.form__vertical} onSubmit={addProjectHandler}>
          <div className={styles.input__box}>
            <label htmlFor="title">
              Project Title <span className={styles.required__field}>*</span>
            </label>
            <input
              type="text"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={styles.input__box}>
            <label htmlFor="link">Project Link</label>
            <input
              type="text"
              placeholder="Project Link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
          <div className={styles.description__box}>
            <div className={styles.desc}>
              <label htmlFor="description" className={styles.desc__header}>
                Project Description{" "}
                <button
                  className={styles.ai__generate}
                  onClick={(e) => {
                    e.preventDefault();
                    setdescription([...description, ""]);
                    setPointIndex(description.length - 1);
                  }}
                >
                  Add
                </button>
              </label>
              <button
                className={styles.ai__generate}
                onClick={generateDescription}
              >
                {" "}
                {loader && (
                  <Image
                    src={"/images/loader.png"}
                    width={20}
                    height={20}
                    className={styles.loader}
                  ></Image>
                )}{" "}
                AI Generate
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
            {
                !edit && 
            <input
              type="submit"
              className={styles.add_button}
              value="Add Project"
            />
            }
            {edit && (
              <button
                className={styles.add_button}
                onClick={updateProjectHandler}
              >
                Edit
              </button>
            )}

            <button
              className={styles.next__button}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("skills");
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

export default Projects;
