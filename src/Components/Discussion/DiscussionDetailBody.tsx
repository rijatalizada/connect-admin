import React, { useState } from "react";
import { IDiscussion, IReply } from "../../Types";
import Replies from "./Replies";

const DiscussionDetailBody = ({
  id,
  title,
  question,
  createdDate,
  name,
  userName,
  profileImage,
  rating,
  replies,
}: IDiscussion) => {
  const [showReplies, setShowReplies] = useState<boolean>(false);

  return (
    <div className="bg-[white] w-full h-full shadow-2xl p-3">
      <div className="user flex items-center mb-8">
        <span className="text-color-primary mr-3 tex ">Created By:</span>
        <div className="user-card flex items-center">
          <img src={profileImage} className="w-12 h-12 rounded-[50%]" alt="" />
          <span className="mx-2 text-color-primary ">{userName}</span>
        </div>
      </div>
      <div className="discussion-title my-4">
        <p className="my-2">Course: {name},</p>
        <p className="">Created At: {createdDate.toString()}</p>
        <h1 className="text-2xl text-color-primary my-4">
          <span className="text-[black]">Title</span>: {title}
        </h1>
        <p className="text-color-primary my-2 text-xl max-h-[5rem] p-2 bg-[#e9e7e6] overflow-auto">
          <span className="text-black">Question:</span> {question}{" "}
        </p>
        <p className="text-color-primary my-2 text-xl max-h-[5rem] p-2 bg-[#e9e7e6] overflow-auto">
          <span className="text-black">Rating:</span> {rating} Stars
        </p>
      </div>
      <div>
        <h1 className="text-center my-4">Total Replies - {replies.length}</h1>
        {replies.length > 0 ? (
          <div>
            {showReplies && (
              <div className="bg-[#e9e7e6] p-3 vs:max-h-[28rem] md:!max-h-[21rem] lg:!max-h-[12rem] overflow-auto">
                {replies.map((reply: IReply) => {
                  return <Replies key={reply.id} {...reply} />;
                })}
              </div>
            )}
            {!showReplies ? (
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setShowReplies(true)}
                  className="mt-4 cursor pointer border-[#1d84b5] border-solid border-[1px] p-2 text-[#1d84b5] duration-[.5s] hover:bg-color-primary hover:text-color-secondary "
                >
                  Show Replies
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setShowReplies(false)}
                  className="mt-4 cursor pointer border-[#1d84b5] border-solid border-[1px] p-2 text-[#1d84b5] duration-[.5s] hover:bg-color-primary hover:text-color-secondary "
                >
                  Hide Replies
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-2xl text-center mt-8 ">No Replies</p>
        )}
      </div>
    </div>
  );
};

export default DiscussionDetailBody;
