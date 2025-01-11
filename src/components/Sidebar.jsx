const Sidebar = () => {
  return (
    <div className="bg-foreground text-white w-64 h-screen fixed top-0 left-0 flex flex-col items-center py-5">
      <div className="flex gap-2">
        <img src="/logo.svg" alt="Logo" className="w-20 mb-5" />
        <img src="/logo_tulisan.svg" alt="Logo" className="w-20 mb-5" />
      </div>
      <nav className="w-full">
        <ul className="text-lg space-y-5">
          <li className="flex items-center gap-3 px-5 hover:text-primary">
            <img src="/dashboard.svg" alt="" />
            <span className="text-black">Dashboard</span>
          </li>
          <li className="flex items-center gap-3 px-5 hover:text-primary">
            <span>Employee</span>
          </li>
          <li className="flex items-center gap-3 px-5 hover:text-primary">
            <span>Tasks</span>
          </li>
          <li className="flex items-center gap-3 px-5 hover:text-primary">
            <span>Salary</span>
          </li>
        </ul>
      </nav>
      <button className="text-white mt-auto px-5 hover:text-red-500">
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
