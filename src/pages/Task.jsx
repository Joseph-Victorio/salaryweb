import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { FaCirclePlus } from "react-icons/fa6";
import Header2 from "../components/Header2";
import { FaFolder } from "react-icons/fa";

const Task = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ nama_tugas: "", tanggal: "", status: "Not Yet" });
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = "http://localhost:5000/tasks"; 

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        setIsModalOpen(false);
        setNewTask({ nama_tugas: "", tanggal: "", status: "Not Yet" });
        fetchTasks();
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="flex bg-gradient-to-b from-[#004D40] via-[#00897B] to-[#4DB6AC] min-h-screen ">
      <Sidebar />
      <main className="ml-64 w-full border-l-2 border-black p-5">
        <Header2 />
        <div className="flex justify-between">
          <h2 className="text-white font-bold">Tugas</h2>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <input
                type="text"
                name="search"
                className="rounded-lg border-black border-2 bg-none pl-8"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <img src="/glass.svg" alt="" className="absolute top-1 left-2 w-4 " />
            </div>
            <button onClick={() => setIsModalOpen(true)}>
              <FaCirclePlus className="text-4xl text-white" />
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-left text-white border-b-2 border-black">
              <th>Info</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {tasks
              .filter((task) => task.nama_tugas.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((task) => (
                <tr key={task.id} className="border-b-2 border-black">
                  <td className="p-2">
                    <div className="flex gap-1 items-center">
                      <FaFolder className="text-2xl" />
                      <p className="text-green-500">{task.nama_tugas}</p>
                    </div>
                  </td>
                  <td>{task.tanggal}</td>
                  <td className={task.status === "Sukses" ? "text-green-500" : "text-red-500"}>
                    {task.status}
                  </td>
                  <td>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Tambah Tugas</h3>
            <form onSubmit={handleAddTask}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Nama Tugas</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  placeholder="Masukkan nama tugas"
                  value={newTask.nama_tugas}
                  onChange={(e) => setNewTask({ ...newTask, nama_tugas: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tanggal</label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  value={newTask.tanggal}
                  onChange={(e) => setNewTask({ ...newTask, tanggal: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                  onClick={() => setIsModalOpen(false)}
                >
                  Batal
                </button>
                <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-lg">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
