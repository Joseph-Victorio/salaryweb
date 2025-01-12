import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

const Salary = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/karyawan");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    fetchEmployees();
  }, []);
  const handlePay = async (employeeId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/karyawan/${employeeId}`,
        {
          status: "Paid", // Ensure this field is correct
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  return (
    <div className="flex bg-gradient-to-b from-[#004D40] via-[#00897B] to-[#4DB6AC]">
      <Sidebar />
      <div className="ml-64 w-full border-l-2 border-black">
        <div className="p-5 flex items-center justify-between w-full">
          <img src="/logo_tulisan.svg" alt="" className="mx-auto" />
          <div className="flex items-center gap-3 float-right">
            <div>
              <p>Situ Nur</p>
              <span className="text-sm text-black">Admin</span>
            </div>
            <img
              src="/avatar.png"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
        <div className="flex justify-between px-20">
          <h2 className="text-white font-bold">Employee</h2>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <input
                type="text"
                name="search"
                className="rounded-lg border-black border-2 bg-none pl-8"
                placeholder="Search"
              />
              <img
                src="/glass.svg"
                alt=""
                className="absolute top-1 left-2 w-4 "
              />
            </div>
          </div>
        </div>
        <main className="p-10 bg-background min-h-screen">
          <div className="mt-10">
            <table className="w-full bg-foreground text-white rounded-lg shadow-md">
              <thead>
                <tr className="text-left bg-primary text-black">
                  <th className="p-3 border-b">Employee</th>
                  <th className="p-3 border-b">Employee ID</th>
                  <th className="p-3 border-b">Pangkat</th>
                  <th className="p-3 border-b text-center">Gaji</th>
                  <th className="p-3 border-b">Status</th>
                  <th className="p-3 border-b"></th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={index} className="hover:bg-background">
                    <td className="p-3 flex items-center gap-3 border-b text-black font-bold">
                      <img
                        src={"/avatar.png"}
                        alt={employee.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex flex-col">
                        <p className="text-black">
                          {employee.nama_depan + " " + employee.nama_belakang}
                        </p>
                        <p className="text-white text-[10px]">
                          {employee.posisi}
                        </p>
                      </div>
                    </td>
                    <td className="p-3 border-b">{employee.id}</td>
                    <td className="p-3 border-b">{employee.pangkat}</td>
                    <td className="p-3 border-b text-center">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(employee.gaji)}
                    </td>
                    <td className="p-3 border-b">
                      {employee.status == "Paid" ? (
                        <p className="text-green-500">Sukses</p>
                      ) : (
                        <p className="text-red-500">Pending</p>
                      )}
                    </td>
                    <td className="p-3 border-b">
                      <button
                        className="bg-black text-white px-10 py-2 rounded-lg"
                        onClick={() => handlePay(employee.id)}
                        disabled={employee.paid}
                      >
                        {employee.paid ? "Paid" : "Bayar"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Salary;
