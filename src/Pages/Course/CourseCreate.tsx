import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getCookie from "../../CustomHooks/getCookies";
import useFetch from "../../CustomHooks/useFetch";
import { ISchool } from "../../Types";
const apiKey = import.meta.env.VITE_API_KEY;
const createCourse = import.meta.env.VITE_CREATE_COURSE;
const getSchool = import.meta.env.VITE_GETONE_SCHOOL;
const getSchools = import.meta.env.VITE_GET_SCHOOLS;

const CourseCreate = () => {
  const { schoolId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [sId, setSchoolId] = useState<number>(Number(schoolId));

  const [school, loading, error] = useFetch(apiKey + getSchool + schoolId);
  const [schools, loading2, error1] = useFetch(apiKey + getSchools);


  const { data, isOkay } = getCookie("admin");

  useEffect(() => {
    if (isOkay) {
      setToken(data!.token);
    }
  }, [isOkay]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: name,
      schoolId: sId,
    };

    const req = await fetch(apiKey + createCourse, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    });

    if (req.status === 201) {
      navigate(`/schools/courses/${sId}`);
      alert("Course created");
    }
  };

  return (
    <div className="grid grid-rows-[20%,80%] w-full h-full">
      <div className="w-full h-full bg-color-primary flex items-center justify-center">
        <p className="text-white text-[2rem]">Create Course for {school.fullname}</p>
      </div>
      <div className="w-full h-full flex mt-10 lg:!mt-0  !items-start lg:!items-center justify-center">
        <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="">{}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-solid border-b-[1px] border-[#1d84b5] outline-[#1d84b5] block my-3 p-2 bg-transparent"
            placeholder="School Fullname"
          />
          <select onChange={(e) => setSchoolId(Number(e.target.value))} className="block p-2 bg-transparent outline-[#1d84b5] border-b-[1px] border-[#1d84b5]" name="" id="" >
            <option value={school.id} >{school.fullname}</option>
            {
                schools.filter((school : ISchool) => school.id != Number(schoolId)).map((school : ISchool) => {
                    return <option key={school.id} value={school.id}>{school.fullname}</option>
                })
            }
          </select>
          <button className="p-2 my-4 bg-color-primary text-color-secondary rounded-md cursor-pointer">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CourseCreate;
