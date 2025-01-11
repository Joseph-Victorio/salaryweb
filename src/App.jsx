import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import LoginKaryawan from "./pages/LoginKaryawan"
import Dashboard from "./pages/Dashboard"


function App() {
 

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/login-karyawan" element={<LoginKaryawan/>}></Route>
        <Route path="/admin/dashboard" element={<Dashboard/>}></Route>
      </Routes>
    </>
  )
}

export default App
