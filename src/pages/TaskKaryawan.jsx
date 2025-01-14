import React, { useState, useEffect } from "react";
import SidebarKaryawan from "../components/SidebarKaryawan";
import { FaFolder } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const TaskKaryawan = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [tasksPerPage] = useState(5);
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

  const handleDone = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Sukses" }),
      });

      if (response.ok) {
        const updatedTasks = tasks.map((task) =>
          task.id === taskId ? { ...task, status: "Sukses" } : task
        );
        setTasks(updatedTasks);
      } else {
        console.error("Failed to update task status.");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
  };

  const currentTasks = tasks.slice(
    currentPage * tasksPerPage,
    (currentPage + 1) * tasksPerPage
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="flex bg-gradient-to-b from-[#004D40] via-[#00897B] to-[#4DB6AC] min-h-screen">
      <SidebarKaryawan />
      <div className="ml-64 w-full border-l-2 border-black">
        <div className="p-5">
          <table className="w-full">
            <thead>
              <tr className="text-left text-white border-b-2 border-black">
                <th>Info</th>
                <th>Tanggal</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((task) => (
                <tr key={task.id} className="border-b-2 border-black">
                  <td className="p-2">
                    <div className="flex gap-1 items-center">
                      <FaFolder className="text-2xl" />
                      <p className="text-green-500">{task.nama_tugas}</p>
                    </div>
                  </td>
                  <td className="p-2">{task.tanggal}</td>
                  <td className={`p-2 ${task.status === "Sukses" ? "text-green-500" : "text-red-500"}`}>
                    {task.status}
                  </td>
                  <td className="p-2">
                    {task.status !== "Sukses" && (
                      <button
                        className="bg-white text-black rounded-full font-bold px-6 py-2"
                        onClick={() => handleDone(task.id)}
                      >
                        Done
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-[300px]">
            <ReactPaginate
              previousLabel={"Prev"}
              nextLabel={"Next"}
              pageCount={Math.ceil(tasks.length / tasksPerPage)}
              onPageChange={handlePageClick}
              containerClassName={"flex justify-between space-x-10 md:w-[700px]"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link py-2 px-4 rounded-lg  text-white   cursor-pointer"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link py-2 px-4 rounded-lg border border-black bg-white  cursor-pointer"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link py-2 px-4 rounded-lg border border-black cursor-pointer text-white"}
              activeClassName={" text-white"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskKaryawan;
