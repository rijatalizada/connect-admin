import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDate from "../../CustomHooks/useDate";
import useFetch from "../../CustomHooks/useFetch";
const apiKey = import.meta.env.VITE_API_KEY;
const getDiscussion = import.meta.env.VITE_GET_DISCUSSION;
import Replies from "../../Components/Discussion/Replies"
import DiscussionDetailBody from "../../Components/Discussion/DiscussionDetailBody";

const Discussion = () => {
  const { id } = useParams();
  const [discussion, loading, error] = useFetch(apiKey + getDiscussion + id);

if(loading){
    return <div>Loading...</div>
}

  return (
    <div className="static h-full grid grid-rows-[20%,80%]">
      <div className="w-full h-full bg-color-primary flex items-center justify-center">
        <p className="text-white text-[2rem]">Discussion Detail</p>
      </div>
      <div className="p-5 bg-[#e9e7e6]">
        <DiscussionDetailBody {...discussion}/>
      </div>
    </div>
  );
};

export default Discussion;
