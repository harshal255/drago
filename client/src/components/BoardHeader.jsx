import React, { useContext, useId } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FaPlus } from "react-icons/fa";

const BoardHeader = () => {
  const { boards, setBoardId, boardId, user } = useContext(AppContext);
  console.log({ boardId, boards, user });
  const navigate = useNavigate();
  return (
    <section className="px-10">
      <h1 className="text-2xl  font-semibold">
        Welcome to the Drago, {user?.fullName}
      </h1>
      <h2 className="text-xl">
        {boards?.length < 1 &&
          "Looks like you haven’t created a board yet. Start by creating one to manage your tasks."}
      </h2>
      <div className="grid grid-cols-5 gap-3 rounded-lg py-5">
        <div
          key={useId}
          onClick={() => navigate("/add-board")}
          className={`cursor-pointer duration-150 bg-gray-100 border border-gray-300 rounded-lg h-[150px] flex items-center justify-center w-full text-3xl gap-2`}
        >
          <FaPlus />
        </div>
        {boards?.map((ele) => {
          return (
            <div
              key={ele.id}
              onClick={() => setBoardId(ele.id)}
              className={`${
                boardId === ele.id
                  ? "bg-gray-200 border-gray-800"
                  : "bg-gray-100  border-gray-300"
              } border cursor-pointer duration-150 rounded-lg h-[150px] flex items-center justify-center w-full text-xl`}
            >
              {ele.title}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BoardHeader;
