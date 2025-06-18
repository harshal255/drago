import React, { useContext, useId } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setBoardId,setCurrentBoard } from "../redux/features/boardSlice";

const BoardHeader = () => {
  const { user } = useContext(AppContext);
  const dispatch = useDispatch();
  const { boards, loading, boardId } = useSelector((state) => state.board);
  const navigate = useNavigate();

  return (
    <section className="px-10">
      <h1 className="text-2xl  font-semibold">
        Welcome to the Drago, {user?.fullName}
      </h1>
      <h2 className="text-md">
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
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className="animate-pulse bg-gray-200 rounded-lg h-[150px] w-full border border-gray-300"
              />
            ))
          : boards?.map((ele) => (
              <div
                key={ele.id}
                onClick={() => {
                  dispatch(setBoardId(ele.id))
                  dispatch(setCurrentBoard(ele.id))
                }}
                className={`${
                  boardId === ele.id
                    ? "bg-gray-200 border-gray-800"
                    : "bg-gray-100 border-gray-300"
                } border cursor-pointer duration-150 rounded-lg h-[150px] flex items-center justify-center w-full text-xl`}
              >
                {ele.title}
              </div>
            ))}
      </div>
    </section>
  );
};

export default BoardHeader;
