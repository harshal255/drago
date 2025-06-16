import { useContext, useEffect, useState } from "react";
import Column from "../components/Column";
import { AppContext } from "../context/AppContext";
import BoardHeader from "../components/BoardHeader";
import { moveTask } from "../api/task";

const Dashboard = () => {
  const [columns, setColumns] = useState([]);
  const { getAllColumns, boardId, getAllTasks } = useContext(AppContext);
  const [tasks, setTasks] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

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
      const updatedTask = await getAllTasks(boardId);
      setTasks(updatedTask);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (boardId) {
      (async () => {
        const cols = await getAllColumns(boardId);
        setColumns(cols);
        const taskList = await getAllTasks(boardId);
        setTasks(taskList);
      })();
    }
  }, [boardId]);

  return (
    <>
      <BoardHeader />
      <>
        <div className="container grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 px-10 gap-5 w-[100dvw]">
          {columns.map((ele) => {
            Object.assign(ele, { tasks, setTasks, setActiveCard, onDrop });
            return <Column key={ele.id} {...ele} />;
          })}
        </div>
      </>
    </>
  );
};

export default Dashboard;
