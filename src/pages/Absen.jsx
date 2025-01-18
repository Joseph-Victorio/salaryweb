import React, { useEffect, useState } from "react";
import SidebarKaryawan from "../components/SidebarKaryawan";
import Header from "../components/Header";
import Clock from "react-live-clock";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "moment/locale/id";
import toast from "react-hot-toast";

moment.locale("id");

const Absen = () => {
  const [username, setUsername] = useState(null);
  const [jamMasuk, setJamMasuk] = useState("Belum absen masuk");
  const [jamKeluar, setJamKeluar] = useState("Belum absen keluar");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedJamMasuk = localStorage.getItem("jamMasuk");
    const storedJamKeluar = localStorage.getItem("jamKeluar");

    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate("/login-karyawan");
    }

    if (storedJamMasuk) {
      setJamMasuk(storedJamMasuk);
    }
    if (storedJamKeluar) {
      setJamKeluar(storedJamKeluar);
    }
  }, [navigate]);

  useEffect(() => {
    if (username) {
      console.log("Fetching attendance for username:", username);

      const fetchAttendanceData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/absen/${username}`
          );
          const { jamMasuk, jamKeluar } = response.data;
          if (jamMasuk) setJamMasuk(jamMasuk);
          if (jamKeluar) setJamKeluar(jamKeluar);
          console.log(response.data);
        } catch (error) {
          console.error(
            "Error fetching attendance data:",
            error.response || error.message
          );
          toast.error("Gagal memuat data absen.");
        }
      };

      fetchAttendanceData();
    }
  }, [username]);

  const handleClockIn = async () => {
    const currentTime = moment().format("HH:mm");
    setJamMasuk(currentTime);
    localStorage.setItem("jamMasuk", currentTime);

    try {
      await axios.put("http://localhost:5000/absen", {
        username,
        waktu: currentTime,
        type: "IN",
      });
      toast.success("Berhasil Absen Masuk!");
    } catch (error) {
      console.error("Error updating clock-in time:", error);
      alert("Failed to update clock-in time.");
    }
  };

  const handleClockOut = async () => {
    const currentTime = moment().format("HH:mm");
    setJamKeluar(currentTime);
    localStorage.setItem("jamKeluar", currentTime);

    try {
      await axios.put("http://localhost:5000/absen", {
        username,
        waktu: currentTime,
        type: "OUT",
      });
      toast.success("Berhasil Absen Keluar!");
    } catch (error) {
      console.error("Error updating clock-out time:", error);
      alert("Failed to update clock-out time.");
    }
  };

  const handleResetAttendance = async () => {
    try {
      await axios.put("http://localhost:5000/absen/reset", {
        username,
      });
      setJamMasuk("Belum absen masuk");
      setJamKeluar("Belum absen keluar");

      toast.success("Absen telah direset di database.");
    } catch (error) {
      console.error("Error resetting attendance:", error);
      toast.error("Gagal mereset data absen di database.");
    }
  };

  return (
    <div className="flex bg-gradient-to-b from-[#004D40] via-[#00897B] to-[#4DB6AC]">
      <SidebarKaryawan />
      <div className="ml-64 w-full border-l-2 border-black">
        <Header />
        <main className="p-10 bg-background min-h-screen">
          <div className="text-center text-white">
            <h1 className="text-3xl ">JAM</h1>
            <Clock
              ticking={true}
              timezone={"Asia/Jakarta"}
              className="text-[100px] font-bold mt-1"
            />
          </div>
          <div className="flex gap-5 justify-between w-[500px] mx-auto">
            <div className="flex flex-col gap-2">
              <button
                onClick={handleClockIn}
                className="text-white bg-black px-5 py-1 text-[54px] rounded-lg md:w-[200px]"
              >
                IN
              </button>
              <p className="text-center text-white text-4xl">{jamMasuk}</p>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleClockOut}
                className="text-black bg-white px-5 py-1 text-[54px] rounded-lg md:w-[200px]"
              >
                OUT
              </button>
              <p className="text-center text-white text-4xl">{jamKeluar}</p>
            </div>
          </div>
          <div className="w-full flex justify-center mt-5">
            <Clock
              format={"dddd"}
              ticking={true}
              timezone={"Asia/Jakarta"}
              className="text-white text-5xl "
            />
          </div>
          <div className="flex justify-center mt-5">
            <button
              onClick={handleResetAttendance}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-2xl"
            >
              Belum Hadir
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Absen;
