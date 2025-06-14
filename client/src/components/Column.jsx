import { useContext, useEffect, useState } from "react";
import Task from "./Task";
import { BsThreeDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { AppContext } from "../context/AppContextProvider";
import { useNavigate } from "react-router-dom";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Column = ({ title, id }) => {
  const { getAllTasks } = useContext(AppContext);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const getTaskPosition = (id) => {
    return tasks.findIndex((task) => task.id === id);
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (active.id === over.id) return;
    setTasks((tasks) => {
      const originalPosition = getTaskPosition(active.id);
      const newPosition = getTaskPosition(over.id);

      return arrayMove(tasks, originalPosition, newPosition);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 👈 Only drag after moving 5px
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    (async () => {
      if (id) {
        const taskList = await getAllTasks(id);
        setTasks(taskList);
      }
    })();
  }, [id]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <div
        className="relative flex flex-col gap-2 px-5 py-2 border-2 border-gray-400 w-full bg-gray-100 h-full"
        //column also draggble insider a boards
        draggable="true"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
      >
        <div className="flex w-full justify-between items-center px-5">
          <h2 className="font-semibold">{title}</h2>
          <span className="cursor-pointer">
            <BsThreeDots />
          </span>
        </div>
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks?.map((ele) => {
            Object.assign(ele, { tasks, setTasks });
            return <Task key={ele.id} {...ele} />;
          })}
        </SortableContext>
        <div
          className="px-5 bottom-5 flex items-center justify-center gap-5 w-fit h-[50px] cursor-pointer"
          onClick={() => navigate(`/add-task/${id}`)}
        >
          Create a New Task
          <FaPlus />
        </div>
      </div>
    </DndContext>
  );
};

export default Column;
