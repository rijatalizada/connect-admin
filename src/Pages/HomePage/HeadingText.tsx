import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../Components/Base/Loading";
import useFetch from "../../CustomHooks/useFetch";
const apiKey = import.meta.env.VITE_API_KEY;
const headingTitle = import.meta.env.VITE_GET_HEADINGTITLE;

const HeadingText = () => {
  const [title, loading, error] = useFetch(apiKey + headingTitle);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="static h-full grid grid-rows-[20%,80%]">
      <div className="w-full h-full bg-color-primary flex items-center justify-center">
        <p className="text-white text-[2rem]">Home Title</p>
      </div>
      <div className="p-10">
        <table className="styled-table w-full">
          <thead className="">
            <tr>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              key={title.id}
              className={`${title.id % 2 == 0 && "active-row"}`}
            >
              <td>{title.title.slice(0, 20)}</td>
              <td>{title.subtitle.slice(0, 90)}...</td>
              <td className="flex flex-col items-center lg:!block  ">
                <Link to={`/updateTitle`}>
                  <button className="p-2 my-2 lg:!my-0 border-solid border-2 mx-1 rounded-lg text-[orange] border-[orange] ">
                    Update
                  </button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HeadingText;
