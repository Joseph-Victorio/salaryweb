import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaCirclePlus } from "react-icons/fa6";
import Header2 from "../components/Header2";
import { FaFolder } from "react-icons/fa";

const Task = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTaskBtn = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
              />
              <img
                src="/glass.svg"
                alt=""
                className="absolute top-1 left-2 w-4 "
              />
            </div>
            <button onClick={addTaskBtn}>
              <FaCirclePlus className="text-4xl text-white" />
            </button>
          </div>
        </div>
        <table className="w-full">
          <tr className="text-left text-white border-b-2 border-black">
            <th>Info</th>
            <th>Tanggal</th>
            <th></th>
          </tr>
          <tbody>
            <tr className="border-b-2 border-black ">
              <td className="p-2">
                <div className="flex gap-1 items-center">
                  <FaFolder className="text-2xl"/>
                  <p className="text-green-500">Project 1</p>
                </div>
              </td>
              <td>12 Desember 2024</td>
              <td className="text-green-500"><p className="text-green-500"></p>Sukses</td>
            </tr>
            <tr className="border-b-2 border-black ">
              <td className="p-2">
                <div className="flex gap-1 items-center">
                  <FaFolder className="text-2xl"/>
                  <p className="text-green-500">Project 2</p>
                </div>
              </td>
              <td>14 Desember 2024</td>
              <td className="text-green-500"><p className="text-green-500"></p>Sukses</td>
            </tr>
            <tr className="border-b-2 border-black ">
              <td className="p-2">
                <div className="flex gap-1 items-center">
                  <FaFolder className="text-2xl"/>
                  <p className="text-green-500">Project 3</p>
                </div>
              </td>
              <td>15 Desember 2024</td>
              <td className="text-red-500"><p className="text-red-500"></p> Not Yet</td>
            </tr>
            <tr className="border-b-2 border-black ">
              <td className="p-2">
                <div className="flex gap-1 items-center">
                  <FaFolder className="text-2xl"/>
                  <p className="text-green-500">Project 4</p>
                </div>
              </td>
              <td>16 Desember 2024</td>
              <td className="text-red-500"><p className="text-red-500"></p> Not Yet</td>
            </tr>
          </tbody>
        </table>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Tambah Tugas</h3>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nama Tugas
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  placeholder="Masukkan nama tugas"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Tanggal
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                  onClick={closeModal}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg"
                >
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
