import { useEffect, useState } from "react";
import Column from "../components/Column";
import BoardHeader from "../components/BoardHeader";
import { moveTask } from "../api/task";
import { useSelector, useDispatch } from "react-redux";
import { fetchColumns } from "../redux/features/columnSlice";
import { fetchTasks } from "../redux/features/taskSlice";

const Dashboard = () => {
  const [activeCard, setActiveCard] = useState(null);
  const dispatch = useDispatch();

  const { columns, loading: columnsLoading } = useSelector(
    (state) => state.column
  );
  const { tasks, loading: tasksLoading } = useSelector((state) => state.task);
  const { boardId } = useSelector((state) => state.board);

  const onDrop = async (column_id, position) => {
    console.log(
      `${activeCard} is going to place into ${column_id} and at the position ${position}`
    );
    if (activeCard == null) return;
    const taskToMove = tasks.find((ele) => ele.id === activeCard); //find task by task id

    try {
      await moveTask({
        task_id: taskToMove.id,
        column_id,
        position,
      });
      dispatch(fetchTasks(boardId));
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (boardId) {
      dispatch(fetchColumns(boardId));
      dispatch(fetchTasks(boardId));
    }
  }, [boardId]);

  return (
    <>
      <BoardHeader />
      <div className="container grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 px-10 gap-5 w-[100dvw]">
        {columnsLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-[500px] bg-gray-200 rounded-lg animate-pulse"
              ></div>
            ))
          : columns?.map((col) => (
              <Column
                key={col.id}
                {...col}
                tasks={tasks}
                setTasks={() => {}}
                onDrop={onDrop}
                setActiveCard={setActiveCard}
                tasksLoading={tasksLoading}
              />
            ))}
      </div>
    </>
  );
};

export default Dashboard;
