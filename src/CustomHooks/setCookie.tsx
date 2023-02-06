import Cookie from "js-cookie";

const setCookie = (key: string, value: string, days: number) => {
  return Cookie.set(key, value, {
    expires: days,
    secure: true,
    sameSite: "strict",
    path: '/'
  });
};


export default setCookie;