import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getCookie from "../../CustomHooks/getCookies";
import useFetch from "../../CustomHooks/useFetch";
import { ISchool } from "../../Types";
const apiKey = import.meta.env.VITE_API_KEY;
const getCourse = import.meta.env.VITE_GETONE_COURSE;
const updateCourse = import.meta.env.VITE_UPDATE_COURSE;
const getSchools = import.meta.env.VITE_GET_SCHOOLS;
const getSchool = import.meta.env.VITE_GETONE_SCHOOL;

const UpdateCourse = () => {
  const { id } = useParams();
  const [course, laoding, error] = useFetch(apiKey + getCourse + id);
  const [schools, loading2, error2] = useFetch(apiKey + getSchools);
  const navigate = useNavigate();
  const [newName, setNewName] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const { data, isOkay } = getCookie("admin");
  const [sId, setSchoolId] = useState<number>();

  useEffect(() => {
    if (isOkay) {
      setToken(data!.token);
    }
  }, [isOkay]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name: newName,
      schoolId: sId,
    };

    try {
      const request = await fetch(apiKey + updateCourse + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      });

      if (request.status == 200) {
        navigate("/schools/courses/" + sId);
        alert("Course updated");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  if (loading2) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full grid grid-rows-[20%,80%]">
      <div className="h-full w-full bg-color-primary flex justify-center items-center">
        <p className="text-white text-[2rem]">Update Course {course.name}</p>
      </div>
      <div className="flex mt-10 lg:!mt-0  !items-start lg:!items-center justify-center">
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div className="">
            <label htmlFor="" className="mr-3">
              Old Abbrevation:{" "}
              <span className="text-color-primary">{course.name}</span>
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border-solid border-b-[1px] border-[#1d84b5] outline-[#1d84b5] block my-3 p-2 bg-transparent"
              placeholder="New Name"
            />
            <select
              onChange={(e) => setSchoolId(+e.target.value)}
              className="block p-2 bg-transparent outline-[#1d84b5] border-b-[1px] border-[#1d84b5]"
              name=""
              id=""
            >
              <option value="">Choose School</option>
              {schools.map((school: ISchool) => {
                return (
                  <option key={school.id} value={school.id}>
                    {school.fullname}
                  </option>
                );
              })}
            </select>
          </div>
          <button className="p-2 my-4 bg-color-primary text-color-secondary rounded-md cursor-pointer">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
