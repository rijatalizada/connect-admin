import React from "react";

interface Props {
  setIsAvtive: (isActive: boolean) => void;
  isActive: boolean;

}

const BurgerToggle = ({ setIsAvtive, isActive } : Props) => {
  return (
    <div
      onClick={() => setIsAvtive(!isActive)}
      id="navMenu"
      className={`block transition-[all_0.8s_ease-in-out]  cursor-pointer ${
        isActive && "delay-[0.8s] rotate-45"
      } z-5`}
    >
      <span
        className={`block w-[28px] h-[2px] rounded-[9999px] bg-color-primary mb-[7px] transition-[all_0.8s_ease-in-out] ${
          isActive && "delay-[.4s] translate-y-[9px]"
        }`}
      ></span>
      <span
        className={`block w-[28px] h-[2px] rounded-[9999px] bg-color-primary mb-[7px] transition-[all_0.8s_ease-in-out] ${
          isActive && "w-[0]"
        }`}
      ></span>
      <span
        className={`block w-[28px] h-[2px] rounded-[9999px] bg-color-primary transition-[all_0.8s_ease-in-out]  ${
          isActive && "delay-[.4s]  translate-y-[-9px] rotate-90"
        }`}
      ></span>
    </div>
  );
};

export default BurgerToggle;
