import React, { useEffect, useState } from "react";
import SidebarKaryawan from "../components/SidebarKaryawan";
import axios from "axios";
import Clock from "react-live-clock";

const SalaryKaryawan = () => {
  const [karyawanData, setKaryawanData] = useState("");
  const [username, setUsername] = useState(null);
  const [taskData, setTaskData] = useState([]);
  const [kurang, setKurang] = useState(0);
  const [taskStatus, setTaskStatus] = useState([]);

  useEffect(() => {
    if (taskData.length > 0) {
      const updatedStatus = taskData.reverse().map((task) => {
        return {
          id: task.id,
          status: task.status,
        };
      });
      setTaskStatus(updatedStatus);
    }
  }, [taskData]);
  useEffect(() => {
    const fetchAllTask = async () => {
      try {
        const res = await axios.get("http://localhost:5000/tasks");
        setTaskData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllTask();
  }, []);

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
  const updateGajiInDatabase = async (updatedGaji) => {
    try {
      if (username) {
        console.log("Sending request to update gaji:", updatedGaji);
        const response = await axios.put(`http://localhost:5000/karyawan-gaji/${username}`, {
          gaji: updatedGaji,
        });
        console.log("Response from server:", response.data);
      }
    } catch (error) {
      console.error("Failed to update gaji:", error.response?.data || error.message);
    }
  };
  console.log(taskStatus[1]);

  return (
    <div className="flex bg-gradient-to-b from-[#004D40] via-[#00897B] to-[#4DB6AC] min-h-screen">
      <SidebarKaryawan />
      <div className="ml-64 w-full border-l-2 border-black p-5">
        <h2 className="text-white text-[100px] text-center">GAJI</h2>
        {karyawanData ? (
         <div className="bg-black p-1 text-white rounded-lg">
         <p className="text-[100px] text-center">
           {(() => {
             let updatedGaji = karyawanData.gaji;
       
             if (
               karyawanData.jam_masuk === "" ||
               (karyawanData.jam_keluar === "" &&
                 taskStatus.some((status) => status.status === "Not Yet"))
             ) {
               updatedGaji -= (karyawanData.gaji * 20) / 100;
             } else if (
               karyawanData.jam_masuk !== "" &&
               karyawanData.jam_keluar !== ""
             ) {
               updatedGaji -= (karyawanData.gaji * 10) / 100;
             } else if (
               karyawanData.jam_masuk === "" ||
               karyawanData.jam_keluar === ""
             ) {
               updatedGaji -= (karyawanData.gaji * 10) / 100;
             } else {
               updatedGaji = karyawanData.gaji;
             }
             updateGajiInDatabase(updatedGaji);
       
             return formatCurrency(updatedGaji);
           })()}
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
        {taskData.map((item, index) => (
          <div
            className="flex flex-col gap-2 px-10 border-b-2 pb-2 border-black"
            key={index}
          >
            <div className="flex justify-between">
              <div className="flex gap-2">
                <img src="/clock.png" alt="" />
                <p>{item.nama_tugas}</p>
              </div>
              <div>
                {item.status !== "Sukses" ? "Task Pending" : "Task Completed"}
              </div>
            </div>
            {item.status !== "Sukses" && (
              <div className="flex justify-between pt-2 border-t-2 border-black">
                <div className="flex gap-2">
                  <p>Potongan</p>
                </div>
                <div>{formatCurrency((karyawanData.gaji * 10) / 100)}</div>
              </div>
            )}
          </div>
        ))}

        {karyawanData ? (
          <>
            {karyawanData.jam_masuk === "" || karyawanData.jam_keluar === "" ? (
              <>
                <div className="flex justify-between gap-2 px-10 border-b-2 pb-2 border-black mt-2">
                  <div className="flex gap-2">
                    <img src="/clock.png" alt="" />
                    <p>Absen</p>
                  </div>
                  <div>Miss</div>
                </div>
                <div className="flex justify-between gap-2 px-10 border-b-2 pb-2 border-black pt-2 ">
                  <div className="flex gap-2">
                    <p>Potongan</p>
                  </div>
                  <div>{formatCurrency((karyawanData.gaji * 10) / 100)}</div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between gap-2 px-10 border-b-2 pb-2 border-black border-t-2 pt-2 mt-2">
                  <div className="flex gap-2">
                    <img src="/clock.png" alt="" />
                    <p>Absen</p>
                  </div>
                  <div>Hadir</div>
                </div>
              </>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default SalaryKaryawan;
