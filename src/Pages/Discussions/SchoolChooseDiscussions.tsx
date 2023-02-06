import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../CustomHooks/useFetch";
import { ISchool } from "../../Types";
const apiKey = import.meta.env.VITE_API_KEY;
const getSchools = import.meta.env.VITE_GET_SCHOOLS;

const ShcoolChooseDiscussions = () => {
  const [schools, loading, error] = useFetch(apiKey + getSchools);

  return (
    <div className="static h-full grid grid-rows-[20%,80%]">
      <div className="w-full h-full bg-color-primary flex flex-col items-center justify-center">
        <p className="text-white text-[2rem]">Choose School</p>
      </div>
      
      <div className="p-10 grid lg:grid-cols-4 gap-5">
        {schools.map((school: ISchool) => {
          return (
            <Link key={school.id} to={`/discussion/chooseCourse/${school.id}`} state={{ schoolId : school.id }} >
              <div
                
                className="bg-color-primary h-[10rem] flex flex-col justify-center p-5"
              >
                <p className="text-color-secondary">{school.fullname}</p>
                <p className="text-color-secondary">{school.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ShcoolChooseDiscussions;
