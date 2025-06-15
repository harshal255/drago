import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import {
  registerUser as registerUserClient,
  loginUser as loginUserClient,
} from "../api/auth";
import { getAllBoards as getAllBoardsClient } from "../api/board";
import { getAllColumns as getAllColumnsClient } from "../api/column";
import { getAllTasksByBoardId } from "../api/task";

export const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState([]);
  const [boardId, setBoardId] = useState("");
  const navigate = useNavigate();

  const registerUser = async (userData) => {
    try {
      const res = await registerUserClient(userData);
      console.log({ res });
      const { message, data } = res;
      Cookies.set("token", data.token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      setToken(data.token);
      setUser(data.user);
      toast.success(message);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  console.log({ user });

  const loginUser = async (userData) => {
    try {
      const res = await loginUserClient(userData);
      const { message, data } = res;
      console.log({ data });
      Cookies.set("token", data.token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
      setToken(data.token);
      setUser(data.user);
      toast.success(message);
      // 🟢 Call board loader directly here after login
      await getAllBoards();
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      const { message } = error.response.data;
      toast.error(message);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    Cookies.remove("token");
    toast.success("Logout Successfull..!");
    navigate("/");
  };

  const getAllBoards = async () => {
    try {
      const res = await getAllBoardsClient();
      const { data } = res;
      const boards = data.map((ele) => {
        return { title: ele.title, id: ele._id };
      });
      console.log({ boards });
      setBoards(boards);
      if (boards.length > 0) {
        setBoardId(boards[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllColumns = async (board_id) => {
    try {
      const res = await getAllColumnsClient(board_id);
      const { data } = res;
      const columns = data.map((ele) => {
        return { title: ele.title, id: ele._id };
      });
      return columns;
    } catch (error) {
      console.error(error);
    }
  };

  const getAllTasks = async (board_id) => {
    try {
      const res = await getAllTasksByBoardId(board_id);
      const { data } = res;
      const tasks = data.map((ele) => {
        return {
          title: ele.title,
          id: ele._id,
          column_id: ele.column_id,
          priority: ele.priority,
          description: ele.description,
          dueDate: ele.dueDate,
          color: ele.color,
          board_id: ele.board_id,
          order: ele.order,
        };
      });
      return tasks;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      setToken(cookieToken);
      getAllBoards();
    }
    setLoading(false); // 🟡 Always set loading after token check
  }, []);

  return (
    <AppContext.Provider
      value={{
        token,
        loading,
        user,
        registerUser,
        loginUser,
        logOut,
        boards,
        getAllBoards,
        getAllColumns,
        getAllTasks,
        boardId,
        setBoardId,
      }}
    >
      <Navbar />
      {/* <div className="max-w-[1280px] mx-auto"> */}
      {children}
      {/* </div> */}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
