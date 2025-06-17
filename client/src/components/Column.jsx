import Task from "./Task";
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DropArea from "./DropArea";

const Column = ({ title, id, tasks, onDrop, setActiveCard, tasksLoading }) => {
  const navigate = useNavigate();
  const columnTasks = tasks.filter((task) => task.column_id === id);

  return (
    <div className="min-h-[400px] rounded-lg relative flex flex-col gap-2 px-5 py-2 border border-gray-300 bg-gray-100 h-full">
      <div className="flex w-full justify-between items-center px-5">
        <h2 className="font-semibold">{title}</h2>
        <span className="cursor-pointer">
          <BsThreeDots />
        </span>
      </div>
      <>
        <DropArea onDrop={() => onDrop(id, 0)} />
        {tasksLoading
          ? Array.from({ length: 2 }).map((_, idx) => (
              <div
                key={idx}
                className="min-h-[80px] w-full bg-gray-200 animate-pulse rounded-lg my-2"
              ></div>
            ))
          : columnTasks.map((task) => (
              <div key={task.id}>
                <Task {...task} setActiveCard={setActiveCard} />
                <DropArea onDrop={() => onDrop(id, task.order + 1)} />
              </div>
            ))}
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
