import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { IUser } from "../Types";

const getCookie = (key: string) => {
  const [isOkay, setIsOkay] = useState<boolean>(false);
  const [data, setData] = useState<IUser>();
  const cookie = Cookie.get(key);
  // const data = JSON.parse(cookie!);

  useEffect(() => {
    if (cookie) {
      setIsOkay(true);
      setData(JSON.parse(cookie));
    } else {
      setIsOkay(false);
    }
  }, [cookie])
  
  return {data, isOkay};

};

export default getCookie;
