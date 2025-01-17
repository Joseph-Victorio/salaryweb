import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import LoginKaryawan from "./pages/LoginKaryawan";
import Dashboard from "./pages/Dashboard";
import Employee from "./pages/Employee";
import Task from "./pages/Task";
import Salary from "./pages/Salary";
import { Toaster } from "react-hot-toast";
import Absen from "./pages/Absen";
import TaskKaryawan from "./pages/TaskKaryawan";
import SalaryKaryawan from "./pages/SalaryKaryawan";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login-karyawan" element={<LoginKaryawan />}></Route>
        <Route path="/admin/dashboard" element={<Dashboard />}></Route>
        <Route path="/admin/employee" element={<Employee />}></Route>
        <Route path="/admin/task" element={<Task />}></Route>
        <Route path="/admin/salary" element={<Salary />}></Route>

        {/* Karyawan */}
        <Route path="/absen" element={<Absen/>}></Route>
        <Route path="/task" element={<TaskKaryawan/>}></Route>
        <Route path="/salary" element={<SalaryKaryawan/>}></Route>
      </Routes>
    </>
  );
}

export default App;
