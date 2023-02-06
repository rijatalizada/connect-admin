import React from "react";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../CustomHooks/useFetch";
const apiKey = import.meta.env.VITE_API_KEY;
const getUser = import.meta.env.VITE_GET_USER;

const UserDetail = () => {
  const { id } = useParams();
  const [user, loading, error] = useFetch(apiKey + getUser + String(id));

  const {
    userName,
    firstName,
    email,
    lastName,
    isActive,
    bio,
    profileImage,
    discussions,
  } = user;

  console.log(id);

  return (
    <div className="static h-full grid grid-rows-[20%,80%]">
      <div className="w-full h-full bg-color-primary flex flex-col items-center justify-center">
        <p className="text-white text-[2rem]">{userName} Detail Page</p>
        <Link to={`/users`} className="p-2 bg-color-secondary rounded-md ">Go Back</Link>
      </div>
      <div className="p-24 bg-[#e9e7e6] h-full w-full">
        <div className="bg-white h-full w-full p-10 shadow-2xl flex ">
          <div className="img-container">
            <img src={profileImage} alt="" className="w-full" />
            <p className="my-2 textt-[1.1rem] text-color-primary">{isActive ? "User is active" : "User is not Active" }</p>
          </div>
          <div className="info ml-10">
            <h1 className="text-2xl ">Username: {userName} ;</h1>
            <p className="text-2xl my-4">
              Fullname: {firstName} {lastName} ;
            </p>
            <p className="text-2xl my-4">Email: {email};</p>
            {/* <p className="text-2xl">Posted Discussions: {discussions.length}</p> */}
            <p className=" my-4"><span className="text-[1.3rem]">Bio:</span> {bio} ;</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
