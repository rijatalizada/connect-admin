import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RemoveModal from "../../Components/Base/RemoveModal";
import getCookie from "../../CustomHooks/getCookies";
import useFetch from "../../CustomHooks/useFetch";
import { IDiscussion } from "../../Types";
const apiKey = import.meta.env.VITE_API_KEY;
const getDiscussions = import.meta.env.VITE_GET_DISCUSSIONS;
const getCourse = import.meta.env.VITE_GETONE_COURSE;
const deleteDiscussion = import.meta.env.VITE_DELETE_DISCUSSION;

const Discussions = () => {
  const { id } = useParams();
  const [discussions, loading, error] = useFetch(apiKey + getDiscussions + id);
  const [course, loading1, error1] = useFetch(apiKey + getCourse + id);
  const [createdDate, setCreatedDate] = useState<string>();
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const [removeId, setRemoveId] = useState<number>();
  const [token, setToken] = useState<string>();

  const { data, isOkay } = getCookie("admin");

  useEffect(() => {
    if (isOkay) {
      setToken(data!.token);
    }
  }, [isOkay]);

  const handleRemove = async () => {
    const request = await fetch(apiKey + deleteDiscussion + removeId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <div className="static h-full grid grid-rows-[20%,80%]">
      {isRemoving && (
        <RemoveModal
          handleRemove={handleRemove}
          setIsRemoving={setIsRemoving}
          type={"discussion"}
        />
      )}
      <div className="w-full h-full bg-color-primary flex items-center justify-center">
        <p className="text-white text-[2rem]">{course.name}Control</p>
      </div>
      {discussions.length > 0 ? 
      <div className="p-10">
        <table className="styled-table w-full">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Created Date</th>
              <th>Rating</th>
              <th>Replies</th>
              <th>Created By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {discussions.map((discussion: IDiscussion, index: number) => {
              return (
                <tr
                  key={discussion.id}
                  className={`${index % 2 == 0 && "active-row"}`}
                >
                  <td>{discussion.id}</td>
                  <td>{discussion.title}</td>
                  <td>{discussion.createdDate.toString()}</td>
                  <td>{discussion.rating}</td>
                  <td>{discussion.discussionReplies}</td>
                  <td className="">{discussion.user}</td>
                  <td className="flex flex-col justify-center items-center lg:!block  ">
                    <Link
                      to={`/discussion/${discussion.id}`}
                      state={{ id: discussion.id }}
                    >
                      <button className="p-2 my-2 lg:!my-0 border-solid border-[1px] mx-1 rounded-lg text-[white] border-[white] bg-[orange] hover:bg-[white] hover:text-[orange] hover:border-[orange] duration-[.5s] ">
                        Detail
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        setIsRemoving(true), setRemoveId(discussion.id);
                      }}
                      className="bg-[red] text-[white] p-2 rounded-md cursor-pointer duration-[.5s] border-solid border-[white] border-[1px] hover:bg-color-secondary hover:border-[red]  hover:text-[red]"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> : <p className="text-center mt-24 text-color-primary text-2xl">No Posted  Discussions</p> }
    </div>
  );
};

export default Discussions;
