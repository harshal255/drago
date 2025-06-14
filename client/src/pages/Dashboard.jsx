import { useContext, useEffect, useState } from "react";
import Column from "../components/Column";
import { AppContext } from "../context/AppContextProvider";
import BoardHeader from "../components/BoardHeader";

const Dashboard = () => {
  const [columns, setColumns] = useState([]);
  const { getAllColumns, boardId } = useContext(AppContext);

  console.log({ boardId });

  useEffect(() => {
    if (boardId) {
      (async () => {
        const cols = await getAllColumns(boardId);
        setColumns(cols);
      })();
    }
  }, [boardId]);

  return (
    <>
      <BoardHeader />
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-5  rounded-3xl gap-5 w-[100dvw]">
          {columns.map((ele) => {
            return <Column key={ele.id} {...ele} />;
          })}
        </div>
      </>
    </>
  );
};

export default Dashboard;
