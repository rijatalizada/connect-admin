import React, { useState } from "react";
import useFetch from "../../CustomHooks/useFetch";
import { Link } from "react-router-dom";
const apiKey = import.meta.env.VITE_API_KEY;
const constUrl = import.meta.env.VITE_CONSTANTS_GET;
import "./Burger.css";
import BurgerToggle from "./BurgerToggle";

const Nav = () => {
  const [data, loading, error] = useFetch(apiKey + constUrl);
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className="lg:w-full lg:h-full  lg:grid lg:grid-rows-[20%,80%] ">
      <div className="lg:w-full lg:h-full p-3 shadow-2xl flex flex-col justify-center items-center">
        <img className="w-[10rem]" src={data.logoURL} alt="" />
      </div>
      <div className="hidden lg:!block lg:w-full lg:h-full p-5 bg-color-primary shadow-2xl ">
        <ul className="list-none p-5 flex flex-col w-full h-2/3 justify-between  items-center">
          <Link to={"schools"}>
            <li className="text-color-secondary nav-item ">Schools</li>
          </Link>
          <Link to={"chooseSchool"}>
            <li className="text-color-secondary nav-item ">Courses</li>
          </Link>
          <Link to={"/users"}>
            <li className="text-color-secondary nav-item ">Users</li>
          </Link>
          <Link to={"/HomeItemsChoose"}>
            <li className="text-color-secondary nav-item ">Home Items</li>
          </Link>
          <Link to={"/discussions/chooseSchoool"}>
            <li className="text-color-secondary nav-item ">Discussions</li>
          </Link>
        </ul>
      </div>
      <div className="toggle lg:hidden fixed right-10 top-10 z-[200000000000000000000]">
        <div className="burger flex items-center justify-center bg-color-secondary h-[5rem] z-[1000000000000]  w-[5rem]  rounded-[50%] text-black">
          <BurgerToggle isActive={isActive} setIsAvtive={setIsActive} />
        </div>
      </div>

      <nav
        className={`nav z-[10000] fixed !overflow-y-hidden  top-0 bg-color-primary flex justify-center items-center  h-full transition-all  duration-[0.8s] ${
          isActive
            ? "opacity-100 w-[100vw] right-0 "
            : "opacity-0 w-0 right-[-60vw]"
        }`}
      >
        <ul className="list-none text-center">
          <Link to={"schools"}>
            <li
              onClick={() => setIsActive(!isActive)}
              className="text-color-secondary nav-item my-2 !text-[3rem] "
            >
              Schools
            </li>
          </Link>
          <Link to={"discussions/chooseSchoool"}>
            <li
              onClick={() => setIsActive(!isActive)}
              className="text-color-secondary nav-item my-2 !text-[3rem] "
            >
              Courses
            </li>
          </Link>
          <Link to={"/users"}>
            <li
              onClick={() => setIsActive(!isActive)}
              className="text-color-secondary nav-item my-2 !text-[3rem] "
            >
              Users
            </li>
          </Link>
          <Link to={"/HomeItemsChoose"}>
            <li
              onClick={() => setIsActive(!isActive)}
              className="text-color-secondary nav-item my-2 !text-[3rem] "
            >
              Users
            </li>
          </Link>
          <Link to={""}>
            <li
              onClick={() => setIsActive(!isActive)}
              className="text-color-secondary nav-item my-2 !text-[3rem] "
            >
              Home Items
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
