import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getCookie from "../../CustomHooks/getCookies";
import RemoveCookie from "../../CustomHooks/removeCookie";
import setCookie from "../../CustomHooks/setCookie";
const apiKey = import.meta.env.VITE_API_KEY;

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { data, isOkay } = getCookie("admin");

  useEffect(() => {
    if (isOkay) {
      if(data?.roles.includes("Admin") || data?.roles.includes("Moderator")) {
        navigate("/home");
      }
    }
  }, [isOkay]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      login: login,
      password: password,
    };

    try {
      const request = await fetch(apiKey + "Auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await request.json();

      if (
        res.message === null &&
        (res.roles.includes("Admin") || res.roles.includes("Moderator"))
      ) {
        setIsError(false);
        RemoveCookie("admin");
        setCookie("admin", JSON.stringify(res), 1);
        navigate("home");
      }
    } catch (error: any) {
      setIsError(true);
      setError("something went wrong");
    }
  };

  return (
    <div className="w-full h-[100vh] bg-color-primary overflow-hidden flex items-center justify-center">
      <div className="login">
        <form action="" onSubmit={(e) => handleLogin(e)}>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="block my-3 p-2 outline-none bg-transparent border-b-[1px] text-color-secondary"
            placeholder="Login"
          />
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block my-3 p-2 outline-none bg-transparent border-b-[1px] text-color-secondary"
            placeholder="Password"
          />
          <p className="text-white">{isError && error}</p>
          <button className="p-2 bg-color-secondary text-color-primary duration-[0.5s] rounded-md mt-2 cursor-pointer hover:text-color-secondary hover:border-solid hover:border-2 hover:border-[white] hover:bg-color-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
