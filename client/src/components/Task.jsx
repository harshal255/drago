import { BsMenuButton } from "react-icons/bs";
import { CiClock1 } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import moment from "moment";
import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
import { useNavigate } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


const Task = ({ id, title, description, dueDate,color }) => {
  const { deleteTask } = useContext(AppContext);
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }; 

  return (
    <div
      className="relative shadow-2xl p-5 rounded-lg bg-white flex flex-col gap-3"
      draggable="true"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
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
          <BsMenuButton />
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
