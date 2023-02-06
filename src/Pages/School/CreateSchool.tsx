import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getCookie from "../../CustomHooks/getCookies";
const apiKey = import.meta.env.VITE_API_KEY;
const createSchool = import.meta.env.VITE_CREATE_SCHOOL;

const CreateSchool = () => {
  const navigate = useNavigate();
  const [abbreviation, setAbbreviation] = useState<string>("")
  const [name, setName] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const {data, isOkay} = getCookie("admin");

  useEffect(() => {
    if (isOkay) {
      setToken(data!.token);
    }
  }, [isOkay]);
  

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data ={
      name: abbreviation,
      fullname: name
    }

    const req = await fetch(apiKey + createSchool, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data)
    });

    if(req.status === 201){
      navigate("/schools");
      alert("School created");
    }
  }

  return (
    <div className="grid grid-rows-[20%,80%] w-full h-full">
      <div className="w-full h-full bg-color-primary flex items-center justify-center">
        <p className="text-white text-[2rem]">Create School</p>
      </div>
      <div className="w-full h-full flex mt-10 lg:!mt-0  !items-start lg:!items-center justify-center">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" value={abbreviation} onChange={(e) => setAbbreviation(e.target.value) } className="border-solid border-b-[1px] border-[#1d84b5] outline-[#1d84b5] block my-3 p-2 bg-transparent" placeholder="School Abbreviation"  />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border-solid border-b-[1px] border-[#1d84b5] outline-[#1d84b5] block my-3 p-2 bg-transparent" placeholder="School Fullname" />
          <button className="p-2 my-2 bg-color-primary text-color-secondary rounded-md cursor-pointer">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateSchool;
