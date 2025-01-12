const Sidebar = () => {
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
              href="/admin/dashboard"
              className="text-black group-hover:border-b-2 group-hover:border-black border-transparent border-b-2 transition-all ease-in-out duration-300"
            >
              Dashboard
            </a>
          </li>
          <li className="flex items-center gap-3 px-5 hover:text-primary group">
            <img src="/emplyees.svg" alt="" />
            <a
              href="/admin/employee"
              className="text-black group-hover:border-b-2 group-hover:border-black border-transparent border-b-2 transition-all ease-in-out duration-300"
            >
              Employee
            </a>
          </li>
          <li className="flex items-center gap-3 px-5 hover:text-primary group">
            <img src="/task.svg" alt="" />
            <a
              href="/admin/task"
              className="text-black group-hover:border-b-2 group-hover:border-black border-transparent border-b-2 transition-all ease-in-out duration-300"
            >
              Tasks
            </a>
          </li>
          <li className="flex items-center gap-3 px-5 hover:text-primary group">
            <img src="/money.svg" alt="" />
            <a
              href="/admin/salary"
              className="text-black group-hover:border-b-2 group-hover:border-black border-transparent border-b-2 transition-all ease-in-out duration-300"
            >
              Salary
            </a>
          </li>
        </ul>
      </nav>
      <button className="text-white mt-auto px-5 hover:text-red-500">
        <a href="/">Logout</a>
      </button>
    </div>
  );
};

export default Sidebar;
