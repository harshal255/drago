import Task from "./Task";
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import DropArea from "./DropArea";

const Column = ({ title, id, tasks, setTasks, onDrop, setActiveCard }) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-lg relative flex flex-col gap-2 px-5 py-2 border border-gray-300 bg-gray-100 h-full">
      <div className="flex w-full justify-between items-center px-5">
        <h2 className="font-semibold">{title}</h2>
        <span className="cursor-pointer">
          <BsThreeDots />
        </span>
      </div>
      <>
        <DropArea onDrop={() => onDrop(id, 0)} />
        {tasks?.map((ele) => {
          if (ele.column_id === id) {
            Object.assign(ele, { tasks, setTasks, setActiveCard });
            return (
              <div key={ele.id}>
                <Task {...ele} />
                <DropArea onDrop={() => onDrop(id, ele.order + 1)} />
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
  );
};

export default Column;
