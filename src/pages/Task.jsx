import React from "react";
import Sidebar from "../components/Sidebar";
import TabelKaryawan from "../components/TabelKaryawan";

const Task = () => {
  const addTaskBtn = ()=>{

  }
  return (
    <div className="flex bg-gradient-to-b from-[#004D40] via-[#00897B] to-[#4DB6AC]">
      <Sidebar />
      <main className="ml-64 w-full border-l-2 border-black p-5">
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
            <button onClick={addTaskBtn}><img src="/plus.svg" alt="" /></button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Task;
