import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RemoveModal from "../../Components/Base/RemoveModal";
import getCookie from "../../CustomHooks/getCookies";
import useFetch from "../../CustomHooks/useFetch";
import { ICourse } from "../../Types";
const apiKey = import.meta.env.VITE_API_KEY;
const getCourses = import.meta.env.VITE_GET_COURSES;
const deleteCourse = import.meta.env.VITE_DELETE_COURSE;
const getSchool = import.meta.env.VITE_GETONE_SCHOOL;

const Courses = () => {
  const { schoolId } = useParams();
  const [courses, loading, error] = useFetch(apiKey + getCourses + schoolId);
  const [school, loading1, error1] = useFetch(apiKey + getSchool + schoolId);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [removingCourseName, setRemovingCourseNAme] = useState<string>("");
  const [removeId, setRemoveId] = useState<number>();

  const [token, setToken] = useState<string>("");

  const { data, isOkay } = getCookie("admin");

  useEffect(() => {
    if (isOkay) {
      setToken(data!.token);
    }
  }, [isOkay]);

  const handleRemove = async () => {
    const req = await fetch(apiKey + deleteCourse + removeId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
  };

  return (
    <div className="static h-full grid grid-rows-[20%,80%]">
      {isRemoving && (
        <RemoveModal
          handleRemove={handleRemove}
          setIsRemoving={setIsRemoving}
          type={removingCourseName}
        />
      )}

      <div className="w-full h-full bg-color-primary flex items-center justify-center">
        <p className="text-white text-[2rem]">
          {school.fullname} Courses Control
        </p>
      </div>
      {courses.length > 0 ? 
      <div className="p-8">
        <table className="styled-table w-full">
          <thead className="">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Discussion-Count</th>
              <th>
                <Link to={`/course/create/${schoolId}`} state={{ schoolId }}>
                  <button className="p-2 rounded-lg mx-2 bg-[#4d9e4d] text-[white]">
                    Create
                  </button>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course: ICourse) => {
              return (
                <tr
                  key={course.id}
                  className={`${course.id % 2 == 0 && "active-row"}`}
                >
                  <td>{course.id}</td>
                  <td>{course.name}</td>
                  <td>{course.discussions.length}</td>
                  <td className="flex flex-col items-center lg:!block  ">
                    <button
                      onClick={() => {
                        setIsRemoving(!isRemoving);
                        setRemoveId(course.id);
                        setRemovingCourseNAme(course.name);
                      }}
                      className="p-2 my-2 lg:!my-0 border-solid border-2 mx-1 rounded-lg text-[red] border-[red]"
                    >
                      Remove
                    </button>
                    <Link to={`/course/update/${course.id}`}>
                      <button className="p-2 my-2 lg:!my-0 border-solid border-2 mx-1 rounded-lg text-[orange] border-[orange] ">
                        Update
                      </button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> : <p className="text-center mt-5 text-2xl">There are currently no courses available</p>}
    </div>
  );
};

export default Courses;
