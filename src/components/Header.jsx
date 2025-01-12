import React, { useState, useEffect } from "react";

const Header = () => {
  const [adminName, setAdminName] = useState("");  // State to hold the admin's name

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminName");  
    if (storedAdmin) {
      setAdminName(storedAdmin); 
    } else {

    }
  }, []);

  var today = new Date();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthWord = monthNames[today.getMonth()];
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + " " + monthWord + " " + yyyy;

  return (
    <div className="px-10 py-5 bg-background text-white">
      <div className="flex items-center gap-3 float-right">
        <div>
          <p>{adminName || "Situ Nur"}</p>
          <span className="text-sm text-black">Admin</span>
        </div>
        <img src="/avatar.png" alt="User" className="w-10 h-10 rounded-full" />
      </div>
      <div className="flex justify-between px-20 mt-20">
        <div>
          <h1 className="text-xl font-bold">Welcome, {adminName || "User"}</h1>
          <p className="text-sm">{today}</p>
        </div>
        <img src="/logo_tulisan.svg" alt="" className="w-20" />
      </div>
    </div>
  );
};

export default Header;
