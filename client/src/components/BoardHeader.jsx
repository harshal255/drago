import React, { useContext, useId } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";
import { FaPlus } from "react-icons/fa";

const BoardHeader = () => {
  const { boards, setBoardId, boardId, token } = useContext(AppContext);
  console.log({ boardId, boards, token });
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-5 gap-3 p-5 border border-gray-500 rounded-lg">
      <div
        key={useId}
        onClick={() => navigate("/add-board")}
        className={`cursor-pointer duration-150 bg-gray-100 border border-gray-300 rounded-lg h-[150px] flex items-center justify-center w-full text-xl gap-2`}
      >
        Create a New Board
        <FaPlus />
      </div>
      {token &&
        boards.map((ele) => {
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
  );
};

export default BoardHeader;
