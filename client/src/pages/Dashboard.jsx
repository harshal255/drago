import { useContext, useEffect, useState } from "react";
import Column from "../components/Column";
import { AppContext } from "../context/AppContextProvider";
import BoardHeader from "../components/BoardHeader";

const Dashboard = () => {
  const [columns, setColumns] = useState([]);
  const { getAllColumns, boardId, getAllTasks } = useContext(AppContext);
  const [tasks, setTasks] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

  console.log({ boardId });
  console.log({ tasks });

  const onDrop = (column_id, position) => {
    console.log(
      `${activeCard} is going to place into ${column_id} and at the position ${position}`
    );

    if (activeCard == null) return;
    const taskToMove = tasks[activeCard]; //find task by index
    const updatedTask = tasks.filter((task, index) => index !== activeCard);
    updatedTask.splice(position, 0, {
      ...taskToMove,
      column_id,
    });
    setTasks(updatedTask);
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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-5  rounded-3xl gap-5 w-[100dvw]">
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
