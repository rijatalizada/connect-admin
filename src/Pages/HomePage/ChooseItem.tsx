import React from "react";
import { Link } from "react-router-dom";
const apiKey = import.meta.env.VITE_API_KEY;
const headingTitle = import.meta.env.VITE_GET_HEADINGTITLE;


const ChooseItem = () => {
  return (
    <div className="static h-full grid grid-rows-[20%,80%]">
      <div className="w-full h-full bg-color-primary flex items-center justify-center">
        <p className="text-white text-[2rem]">Choose Item</p>
      </div>
      <div className="p-10 grid grid-cols-2 gap-10">
        <Link to={"/headingText"} className="text-center p-3 bg-color-primary rounded-md h-[3rem] text-white">
            <p>Heading Text</p>
        </Link>
        <Link to={"/homeSliders"} className="text-center p-3 bg-color-primary h-[3rem] rounded-md text-white">
            <p>Sliders</p>
        </Link>
      </div>
    </div>
  );
};

export default ChooseItem;
