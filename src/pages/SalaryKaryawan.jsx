import React, { useEffect, useState } from "react";
import SidebarKaryawan from "../components/SidebarKaryawan";
import axios from "axios";
import Clock from "react-live-clock";

const SalaryKaryawan = () => {
  const [karyawanData, setKaryawanData] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      console.log("No username found, please log in.");
    }
  }, []);

  useEffect(() => {
    if (username) {
      const fetchKaryawan = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/karyawan/${username}`
          );
          setKaryawanData(res.data);
        } catch (error) {
          if (error.response) {
            if (error.response.status === 404) {
              console.log("Karyawan not found");
            } else if (error.response.status === 500) {
              console.log("Server error occurred");
            }
          } else {
            console.log("Network error or no response from server");
          }
        }
      };
      fetchKaryawan();
    }
  }, [username]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex bg-gradient-to-b from-[#004D40] via-[#00897B] to-[#4DB6AC] min-h-screen">
      <SidebarKaryawan />
      <div className="ml-64 w-full border-l-2 border-black p-5">
        <h2 className="text-white text-[100px] text-center">GAJI</h2>
        {karyawanData ? (
          <div className="bg-black p-1 text-white rounded-lg">
            <p className="text-[100px] text-center">
              {formatCurrency(karyawanData.gaji)}
            </p>
          </div>
        ) : (
          <p className="text-white mt-5">Memuat data gaji...</p>
        )}
        <div className="text-center mt-5">
          <Clock
            format={"MMMM"}
            ticking={true}
            timezone={"Asia/Jakarta"}
            className="text-white text-5xl "
          />
        </div>
      </div>
    </div>
  );
};

export default SalaryKaryawan;
