import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TabelKaryawan from "../components/TabelKaryawan";

const Employee = () => {
  const employees = [
    {
      name: "Budi Alam",
      id: "8475987092834",
      pangkat: "Manager",
      time: "13:00",
      avatar: "/avatar.png",
    },
    {
      name: "Jamal Alim",
      id: "82345653534634",
      pangkat: "Staff",
      time: "13:00",
      avatar: "/avatar.png",
    },
    {
      name: "Udin",
      id: "34648394839834",
      pangkat: "Front End",
      time: "13:00",
      avatar: "/avatar.png",
    },
  ];
  return (
    <div className="flex bg-gradient-to-b from-[#004D40] via-[#00897B] to-[#4DB6AC]">
      <Sidebar />
      <div className="ml-64 w-full border-l-2 border-black">
        <Header />
        <main className="p-10 bg-background min-h-screen">
          <div className="mt-10">
            <TabelKaryawan employees={employees} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Employee;
