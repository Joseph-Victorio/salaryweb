import React, { useState, useEffect } from "react";

const Header2 = () => {
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminName");
    if (storedAdmin) {
      setAdminName(storedAdmin);
    }
  }, []);

  return (
    <div className="p-5 flex items-center justify-between w-full">
      <img src="/logo_tulisan.svg" alt="" className="mx-auto" />
      <div className="flex items-center gap-3 float-right">
        <div>
          <p>{adminName || "Situ Nur"}</p>
          <span className="text-sm text-black">Admin</span>
        </div>
        <img src="/avatar.png" alt="User" className="w-10 h-10 rounded-full" />
      </div>
    </div>
  );
};

export default Header2;
