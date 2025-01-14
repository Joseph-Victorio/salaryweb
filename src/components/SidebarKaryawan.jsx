import React from "react";

const SidebarKaryawan = () => {
  return (
    <div className="bg-foreground text-white w-64 h-screen fixed top-0 left-0 flex flex-col items-center py-5">
      <div className="flex gap-2">
        <img src="/logo.svg" alt="Logo" className="w-20 mb-5" />
        <img src="/logo_tulisan.svg" alt="Logo" className="w-20 mb-5" />
      </div>
      <nav className="w-full">
        <ul className="text-lg space-y-5">
          <li className="flex items-center gap-3 px-5 group ">
            <img src="/dashboard.svg" alt="" />
            <a
              href="/absen"
              className="text-black group-hover:border-b-2 group-hover:border-black border-transparent border-b-2 transition-all ease-in-out duration-300"
            >
              Absen
            </a>
          </li>
          <li className="flex items-center gap-3 px-5 hover:text-primary group">
            <img src="/task.svg" alt="" />
            <a
              href="/task"
              className="text-black group-hover:border-b-2 group-hover:border-black border-transparent border-b-2 transition-all ease-in-out duration-300"
            >
              Tasks
            </a>
          </li>
          <li className="flex items-center gap-3 px-5 hover:text-primary group">
            <img src="/money.svg" alt="" />
            <a
              href="/salary"
              className="text-black group-hover:border-b-2 group-hover:border-black border-transparent border-b-2 transition-all ease-in-out duration-300"
            >
              Salary
            </a>
          </li>
        </ul>
      </nav>
      <button className="text-white mt-auto px-5 hover:text-red-500">
      <a href="/login-karyawan" className="flex gap-1"><img src="/logout.png" alt="" /><p className="text-black">Logout</p></a>
      </button>
    </div>
  );
};

export default SidebarKaryawan;
