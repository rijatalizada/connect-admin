import React, { useEffect, useState } from "react";
import { useNavigate, useNavigationType } from "react-router-dom";
import Loading from "../../Components/Base/Loading";
import getCookie from "../../CustomHooks/getCookies";
import useFetch from "../../CustomHooks/useFetch";

const apiKey = import.meta.env.VITE_API_KEY;
const headingTitle = import.meta.env.VITE_GET_HEADINGTITLE;
const updateTitle = import.meta.env.VITE_UPDATE_HEADINGTITLE;

const UpdateTitle = () => {
  const [title, laoding, error] = useFetch(apiKey + headingTitle);
  const [newTitle, setNewTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const { data, isOkay } = getCookie("admin");
    const navigate = useNavigate()

  useEffect(() => {
    if (isOkay) {
      setToken(data!.token);
    }
  }, [isOkay]);

  useEffect(() => {
    if (title) {
      console.log(title.title);

      setNewTitle(title.title);
      setSubtitle(title.subtitle);
    }
  }, [laoding]);

  if (laoding) {
    return <Loading />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      title: newTitle,
      subtitle: subtitle,
    };
    const response = await fetch(apiKey + updateTitle, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.status == 200) {
      alert("Update Success");
      navigate("/headingText")
    }
  };

  return (
    <div className="static h-full grid grid-rows-[20%,80%]">
      <div className="w-full h-full bg-color-primary flex items-center justify-center">
        <p className="text-white text-[2rem]">Home Title Update</p>
      </div>
      <div className="bg-[#e9e7e6]  p-10">
        <form onSubmit={(e) => handleSubmit(e)} className="bg-white w-full h-full shadow-md p-10">
          <p className="my-5">Title:</p>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-2 outline-none rounded-md border-[#1d84b5] border-solid border-2 mb-5"
            placeholder="Title"
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="form-control block my-3 w-full p-3 h-[14rem] overflow-auto resize-none  border-solid border-[#1d84b5] border-[1px] rounded-md  focus:outline-none"
            placeholder="Description"
            required
          ></textarea>
          <button  className="text-color-primary border-slid border-2 border-[#1d84b5] p-2 rounded-md">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTitle;
