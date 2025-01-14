import React, { useState, useEffect } from "react";

const Header = () => {
  const [karyawanName, setKaryawanName] = useState("");  

  useEffect(() => {
    const storedKaryawan = localStorage.getItem("username");  
    if (storedKaryawan) {
      setKaryawanName(storedKaryawan);  
    }
  }, []);

  const today = new Date();

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
  const dd = String(today.getDate()).padStart(2, "0");
  const yyyy = today.getFullYear();

  const formattedDate = `${dd} ${monthWord} ${yyyy}`;

  return (
    <div className="px-10 py-5 bg-background text-white">
      <div className="flex justify-between px-20 mt-2">
        <div>
          <h1 className="text-xl font-bold">Welcome, {karyawanName || "User"}</h1>
          <p className="text-sm">{formattedDate}</p>
        </div>
        <img src="/logo_tulisan.svg" alt="Logo" className="w-20" />
      </div>
    </div>
  );
};

export default Header;
