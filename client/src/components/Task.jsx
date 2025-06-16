import { BsMenuButton } from "react-icons/bs";
import { CiClock1 } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import moment from "moment";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { deleteTask as deleteTaskClient } from "../api/task";
import toast from "react-hot-toast";
import { useContext } from "react";

const Task = ({
  id,
  board_id,
  title,
  description,
  dueDate,
  color,
  setTasks,
  setActiveCard,
}) => {
  const navigate = useNavigate();
  const { getAllTasks } = useContext(AppContext);

  const deleteTask = async (task_id) => {
    try {
      const res = await deleteTaskClient(task_id);
      const { message } = res;
      toast.success(message);
      const tasks = await getAllTasks(board_id);
      setTasks(tasks);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="relative shadow-2xl p-5 rounded-lg bg-white flex flex-col gap-3"
      draggable={true}
      onDragStart={() => setActiveCard(id)}
      onDragEnd={() => setActiveCard(null)}
    >
      <div className="flex items-center gap-5 absolute top-0 right-0.5 p-3 text-xl z-50">
        <FaEdit
          className="cursor-pointer hover:scale-110 duration-300 "
          onClick={() => navigate(`/update-task/${id}`)}
        />
        <MdDeleteOutline
          className="cursor-pointer hover:scale-110 duration-300"
          onClick={() => deleteTask(id)}
        />
      </div>
      <span
        className={`text-sm rounded-sm text-white px-2 w-fit`}
        style={{ backgroundColor: color }}
      >
        {title}
      </span>
      <div>{description}</div>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-gray-500">
          <CiClock1 />
          <span>{moment(dueDate).format("MMM Do YY")}</span>
        </span>
        <span className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-gray-300"></div>
          <div className="h-7 w-7 rounded-full bg-gray-300"></div>
        </span>
      </div>
    </div>
  );
};

export default Task;
