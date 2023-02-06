import React from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../CustomHooks/useFetch";
import { ICourse } from "../../Types";
const apiKey = import.meta.env.VITE_API_KEY;
const getCourses = import.meta.env.VITE_GET_COURSES;

const CoursesChooseDiscussion = () => {
  const { schoolId } = useParams();
  const [courses, laoding, error] = useFetch(apiKey + getCourses + schoolId);

  return (
    <div className="static h-full grid grid-rows-[20%,80%]">
      <div className="w-full h-full bg-color-primary flex flex-col items-center justify-center">
        <p className="text-white text-[2rem]">Choose Course</p>
      </div>
      {courses.length > 0 ? (
        <div className="p-10 grid lg:grid-cols-4 gap-10">
          {courses.map((course: ICourse) => {
            return (
              <Link
                to={`/course/discussions/${course.id}`}
                state={course.id}
                key={course.id}
                className="animate__animated animate__fadeInRightBig"
              >
                <div className="bg-color-primary h-[10rem] flex flex-col justify-center p-5">
                  <p className="text-color-secondary">{course.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-center mt-5 text-2xl">
          There are currently no courses available
        </p>
      )}
    </div>
  );
};

export default CoursesChooseDiscussion;
