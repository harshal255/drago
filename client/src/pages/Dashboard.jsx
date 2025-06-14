import { useContext, useEffect, useState } from "react";
import Column from "../components/Column";
import { AppContext } from "../context/AppContextProvider";
import BoardHeader from "../components/BoardHeader";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

const Dashboard = () => {
  const [columns, setColumns] = useState([]);
  const { getAllColumns, boardId } = useContext(AppContext);

  const getTaskPosition = (id) => {
    return columns.findIndex((col) => col.id === id);
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;
    if (active.id === over.id) return;
    setColumns((tasks) => {
      const originalPosition = getTaskPosition(active.id);
      const newPosition = getTaskPosition(over.id);

      return arrayMove(tasks, originalPosition, newPosition);
    });
  };

  console.log({ boardId });
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 👈 Only drag after moving 5px
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (boardId) {
      (async () => {
        const cols = await getAllColumns(boardId);
        setColumns(cols);
      })();
    }
  }, [boardId]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
    >
      <BoardHeader />
      <SortableContext items={columns} strategy={horizontalListSortingStrategy}>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-5  rounded-3xl gap-5 w-[100dvw]">
          {columns.map((ele) => {
            return <Column key={ele.id} {...ele} />;
          })}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default Dashboard;
