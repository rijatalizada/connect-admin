import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getCookie from "../../CustomHooks/getCookies";
import useFetch from "../../CustomHooks/useFetch";
const apiKey = import.meta.env.VITE_API_KEY;
const shcoolsGetUrl = import.meta.env.VITE_GETONE_SCHOOL;
const updtaeUrl = import.meta.env.VITE_UPDATE_SCHOOL;

const UpdateSchool = () => {
  const { id } = useParams();
  const [school, loading, error] = useFetch(apiKey + shcoolsGetUrl + id);
  const navigate = useNavigate();
  const [newAbbreviation, setNewAbbreviation] = useState<string>("");
  const [newName, setNewName] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const { data, isOkay } = getCookie("admin");

  useEffect(() => {
    if (isOkay) {
      setToken(data!.token);
      console.log(token);
    }
  }, [isOkay]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: newAbbreviation,
      fullname: newName,
    };

    try {
      const request = await fetch(apiKey + updtaeUrl + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      });


      if (request.status == 200) {
        navigate("/schools");
        alert("School updated");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full grid grid-rows-[20%,80%]">
      <div className="h-full w-full bg-color-primary flex justify-center items-center">
        <p className="text-white text-[2rem]">Update School</p>
      </div>
      <div className="flex mt-10 lg:!mt-0  !items-start lg:!items-center justify-center">
        <form action="" onSubmit={(e) => handleSubmit(e)}>
          <div className="">
            <label htmlFor="" className="mr-3">
              Old Abbrevation: <span className="text-color-primary">{school.name}</span>
            </label>
            <input
              type="text"
              value={newAbbreviation}
              onChange={(e) => setNewAbbreviation(e.target.value)}
              className="border-solid border-b-[1px] border-[#1d84b5] outline-[#1d84b5] block my-3 p-2 bg-transparent"
              placeholder="New Abbreviation"
            />
          </div>
          <div className="">
            <label htmlFor="" className="mr-3">
              Old Name:{" "}
              <span className="text-color-primary">{school.fullname}</span>
            </label>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border-solid border-b-[1px] border-[#1d84b5] outline-[#1d84b5] block my-3 p-2 bg-transparent"
              placeholder="New Fullname"
            />
          </div>
          <button className="p-2 my-2 bg-color-primary text-color-secondary rounded-md cursor-pointer">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateSchool;
function useNavigation() {
  throw new Error("Function not implemented.");
}
