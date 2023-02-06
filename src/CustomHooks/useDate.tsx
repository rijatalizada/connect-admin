import React, { useEffect, useState } from "react";

const useDate = (date: string) => {
  const [dateArray, setDateArray] = useState(date.split("-"));
  const [stateYear, setYear] = useState("");
  const [stateMonth, setMonth] = useState("");
  const [stateDay, setDay] = useState("");
  const [ isToday , setIsToday ] = useState(false);

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  let yy = parseInt(dateArray[0]);
  let mm = parseInt(dateArray[1]);
  let dd = parseInt(dateArray[2]);
  let years: number, months: number, days: number;
  // months
  months = month - mm;
  if (day < dd) {
    months = months - 1;
  }
  // years
  years = year - yy;
  if (month * 100 + day < mm * 100 + dd) {
    years = years - 1;
    months = months + 12;
  }
  // days
  days = Math.floor(
    (today.getTime() - new Date(yy + years, mm + months - 1, dd).getTime()) /
      (24 * 60 * 60 * 1000)
  );

  useEffect(() => {

    if (years != 0) {
      setYear(`${years} years,`);
    } else {
      setYear("");
    }
  
    if (months != 0) {
      setMonth(`${months} months,`);
    } else {
      setMonth("");
    }
  
    if (days != 0) {
      setDay(`${days} days`);
    } else {
      setDay("");
    }
  
    if(years == 0 && months == 0 && days == 0){
      setIsToday(true);
    }
  }, [])

  return { stateYear, stateMonth, stateDay, isToday };
};

export default useDate;
