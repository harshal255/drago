import "./App.css";
import Auth from "./pages/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AppContextProvider from "./context/AppContextProvider";
import PrivateRoute from "./pages/PrivateRoute";
import AddBoard from "./pages/AddBoard";
import AddTask from "./pages/AddTask";
import UpdateTask from "./pages/UpdateTask";
import UpdateBoard from "./pages/UpdateBoard";
import PublicRoute from "./pages/PubliRoute";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <AppContextProvider>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Auth />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-board" element={<AddBoard />} />
            <Route path="/update-board/:board_id" element={<UpdateBoard />} />
            <Route path="/add-task/:column_id" element={<AddTask />} />
            <Route path="/update-task/:task_id" element={<UpdateTask />} />
          </Route>
        </Routes>
      </AppContextProvider>
    </Provider>
  );
}

export default App;
