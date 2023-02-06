import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../CustomHooks/useFetch";
import { ISchool } from "../../Types";
const apiKey = import.meta.env.VITE_API_KEY;
const getSchools = import.meta.env.VITE_GET_SCHOOLS;

const ChooseSchool = () => {
  const [schools, loading, error] = useFetch(apiKey + getSchools);
  return (
    <div className="w-full h-full grid grid-rows-[20%,80%]">
      <div className="h-full flex justify-center items-center w-full bg-color-primary">
        <p className="text-white text-[2rem]">Choose School</p>
      </div>
      <div className="h-full w-full flex justify-center items-center container mx-auto">
        <div className="w-full  grid lg:!grid-cols-4 gap-4">
          {schools?.map((school: ISchool) => (
            <Link to={`/schools/courses/${school.id}`} state={{ schoolId: (school.id) }} key={school.id}>
              <div className="w-full h-[10rem] bg-color-primary flex items-center p-4">
                <p className="text-white text-[1.1rem]">
                  {school.fullname}{" "}
                  <span className="block">
                    ({school.name}) - {school.courses.length}
                  </span>{" "}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChooseSchool;
