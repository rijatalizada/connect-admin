import Cookie from "js-cookie";

const RemoveCookie = (key: string) => {
    Cookie.remove(key);
}

export default RemoveCookie;