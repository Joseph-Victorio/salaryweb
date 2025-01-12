import React from "react";
import Sidebar from "../components/Sidebar";
import TabelKaryawan from "../components/TabelKaryawan";

const Task = () => {
  return (
    <div className="flex bg-gradient-to-b from-[#004D40] via-[#00897B] to-[#4DB6AC]">
      <Sidebar />
      <main>
        <TabelKaryawan/>
      </main>
    </div>
  );
};

export default Task;
