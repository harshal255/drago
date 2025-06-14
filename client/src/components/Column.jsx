import Task from "./Task";
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { AppContext } from "../context/AppContextProvider";
import { useNavigate } from "react-router-dom";
import DropArea from "./DropArea";

const Column = ({ title, id, tasks, setTasks, onDrop, setActiveCard }) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="relative flex flex-col gap-2 px-5 py-2 border-2 border-gray-400 w-full bg-gray-100 h-full">
        <div className="flex w-full justify-between items-center px-5">
          <h2 className="font-semibold">{title}</h2>
          <span className="cursor-pointer">
            <BsThreeDots />
          </span>
        </div>
        <>
          <DropArea onDrop={() => onDrop(id, 0)} />
          {tasks?.map((ele, index) => {
            if (ele.column_id === id) {
              Object.assign(ele, { tasks, setTasks, setActiveCard, index });
              return (
                <div key={index}>
                  <Task key={ele.id} {...ele} />
                  <DropArea onDrop={() => onDrop(id, index + 1)} />
                </div>
              );
            }
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
