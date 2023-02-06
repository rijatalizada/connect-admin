import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getCookie from "../../CustomHooks/getCookies";
import useFetch from "../../CustomHooks/useFetch";
import { IUser } from "../../Types";
const apiKey = import.meta.env.VITE_API_KEY;
const getUsers = import.meta.env.VITE_GET_USERS;
const ToggleUser = import.meta.env.VITE_TOGGLE_USER;

const Users = () => {
  const [users, loading, error] = useFetch(apiKey + getUsers);
  const [token, setToken] = useState<string>("");
  const { data, isOkay } = getCookie("admin");

  useEffect(() => {
    if (isOkay) {
      setToken(data!.token);
    }
  }, [isOkay]);

  const toggleUser = async (id: string) => {
    console.log(id);

    const request = await fetch(apiKey + ToggleUser + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    window.location.reload();
  };

  return (
    <div className="static h-full grid grid-rows-[20%,80%]">
      <div className="w-full h-full bg-color-primary flex items-center justify-center">
        <p className="text-white text-[2rem]">Schools Control</p>
      </div>
      <div className="p-10">
        <table className="styled-table w-full">
          <thead>
            <tr>
              <th>Username</th>
              <th>IsActive</th>
              <th>Discussions</th>
              <th>ProfileImage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: IUser, index: number) => {
              return (
                <tr
                  key={user.id}
                  className={`${index % 2 == 0 && "active-row"}`}
                >
                  <td>{user.userName}</td>
                  <td>{user.isActive.toString()}</td>
                  <td>{user.discussions.length}</td>
                  <td className="">
                    <img
                      className="h-[4rem] w-[4rem] rounded-[50%]"
                      src={user.profileImage}
                      alt=""
                    />
                  </td>
                  <td className="flex flex-col justify-center items-center lg:!block  ">
                    <Link to={`/user/${user.id}`} state={{ id:user.id }}>
                      <button className="p-2 my-2 lg:!my-0 border-solid border-2 mx-1 rounded-lg text-[orange] border-[orange] ">
                        Detail
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        toggleUser(user.id);
                      }}
                      className="p-2 my-2 lg:!my-0 border-solid border-2 mx-1 rounded-lg text-[crimson] border-[crimson] "
                    >
                      {user.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
