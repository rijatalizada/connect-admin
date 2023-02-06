import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RemoveModal from "../../Components/Base/RemoveModal";
import getCookie from "../../CustomHooks/getCookies";
import useFetch from "../../CustomHooks/useFetch";
import { ISchool } from "../../Types";
const apiKey = import.meta.env.VITE_API_KEY;
const shcoolsGetUrl = import.meta.env.VITE_GET_SCHOOLS;
const schoolDeleteUrl = import.meta.env.VITE_DELETE_SCHOOL;

const Schools = () => {
  const [schools, loading, error] = useFetch(apiKey + shcoolsGetUrl);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [removeId, setRemoveId] = useState<number>();
  const [token, setToken] = useState<string>("");
  const [removingSchoolName, setRemovingSchoolName] = useState<string>("");

  const { data, isOkay } = getCookie("admin");

  useEffect(() => {
    if (isOkay) {
      setToken(data!.token);
    }
  }, [isOkay]);

  const handleRemove = async () => {
    const req = await fetch(apiKey + schoolDeleteUrl + removeId, {
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
        <RemoveModal handleRemove={handleRemove} setIsRemoving={setIsRemoving} type={removingSchoolName}/>
      )}

      <div className="w-full h-full bg-color-primary flex items-center justify-center">
        <p className="text-white text-[2rem]">Schools Control</p>
      </div>
      <div className="p-10">
        <table className="styled-table w-full">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Fullname</th>
              <th>Courses-Count</th>
              <th>
                <Link to={"/schoolCreate"}>
                  <button className="p-2 rounded-lg mx-2 bg-[#4d9e4d] text-[white]">
                    Create
                  </button>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school: ISchool) => {
              return (
                <tr
                  key={school.id}
                  className={`${school.id % 2 == 0 && "active-row"}`}
                >
                  <td>{school.id}</td>
                  <td>{school.name}</td>
                  <td>{school.fullname}</td>
                  <td>{school.courses.length}</td>
                  <td className="flex flex-col items-center lg:!block  ">
                    <button
                      onClick={() => {
                        setIsRemoving(!isRemoving);
                        setRemoveId(school.id);
                        setRemovingSchoolName(school.fullname);
                      }}
                      className="p-2 my-2 lg:!my-0 border-solid border-2 mx-1 rounded-lg text-[red] border-[red]"
                    >
                      Remove
                    </button>
                    <Link to={`/updateSchool/${school.id}`}>
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
      </div>
    </div>
  );
};

export default Schools;
