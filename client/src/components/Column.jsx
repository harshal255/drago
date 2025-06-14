import { useContext, useEffect, useState } from "react";
import Task from "./Task";
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { AppContext } from "../context/AppContextProvider";
import { useNavigate } from "react-router-dom";

const Column = ({ title, id }) => {
  const { getAllTasks } = useContext(AppContext);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (id) {
        const taskList = await getAllTasks(id);
        setTasks(taskList);
      }
    })();
  }, [id]);

  return (
    <div>
      <div
        className="relative flex flex-col gap-2 px-5 py-2 border-2 border-gray-400 w-full bg-gray-100 h-full"
      >
        <div className="flex w-full justify-between items-center px-5">
          <h2 className="font-semibold">{title}</h2>
          <span className="cursor-pointer">
            <BsThreeDots />
          </span>
        </div>
        <>
          {tasks?.map((ele) => {
            Object.assign(ele, { tasks, setTasks });
            return <Task key={ele.id} {...ele} />;
          })}
        </>
        <div
          className="px-5 bottom-5 flex items-center justify-center gap-5 w-fit h-[50px] cursor-pointer"
          onClick={() => navigate(`/add-task/${id}`)}
        >
          Create a New Task
          <FaPlus />
        </div>
      </div>
    </div>
  );
};

export default Column;
