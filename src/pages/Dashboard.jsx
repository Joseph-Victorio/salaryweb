import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";
import EmployeeTable from "../components/TabelKaryawan";
import TabelKaryawan from "../components/TabelKaryawan";

const Dashboard = () => {
  const employees = [
    {
      name: "Budi Alam",
      id: "8475987092834",
      pangkat: "Manager",
      time: "13:00",
      avatar: "/avatar1.png",
    },
    {
      name: "Jamal Alim",
      id: "82345653534634",
      pangkat: "Staff",
      time: "13:00",
      avatar: "/avatar2.png",
    },
    {
      name: "Udin",
      id: "34648394839834",
      pangkat: "Front End",
      time: "13:00",
      avatar: "/avatar3.png",
    },
  ];

  return (
    <div className="flex bg-gradient-to-b from-[#004D40] via-[#00897B] to-[#4DB6AC]">
      <Sidebar />
      <div className="ml-64 w-full border-l-2 border-black">
        <Header />
        <main className="p-10 bg-background min-h-screen">
          <div className="flex gap-5 justify-between">
            {/* tugas */}
            <div className="">
              <p className="text-black font-bold text-xl">Tugas</p>
              <p className="text-white text-sm">Progress</p>
              <div className=" h-[200px] overflow-y-scroll p-2 gap-5 flex-col flex">
                <TaskCard project="Project 1" time="18:00" value={"33"} />
                <TaskCard project="Project 2" time="12:00" value={"75"} />
                <TaskCard project="Project 2" time="12:00" value={"75"} />
              </div>
            </div>
            {/* PANGKAT */}
            <div className="">
              <p className="text-black font-bold text-xl mb-5">Pangkat</p>
              <div className="flex">
                <span className=" px-4 border-b-2 border-[#40FF00]"></span>
                <span className=" px-4 border-b-2 border-[#ABBDC8]"></span>
                <span className=" px-3 border-b-2 border-[#FABB18]"></span>
                <span className=" px-5 border-b-2 border-[#BC0808]"></span>
              </div>
              <div className="mt-5">
                <div className="flex gap-5 items-center">
                  <div className="w-2 h-2 bg-[#40FF00]"></div>
                  <p className="text-white text-sm">Manager</p>
                </div>
                <div className="flex gap-5 items-center">
                  <div className="w-2 h-2 bg-[#ABBDC8]"></div>
                  <p className="text-white text-sm">Senior</p>
                </div>
                <div className="flex gap-5 items-center">
                  <div className="w-2 h-2 bg-[#FABB18]"></div>
                  <p className="text-white text-sm">Super Visor</p>
                </div>
                <div className="flex gap-5 items-center">
                  <div className="w-2 h-2 bg-[#BC0808]"></div>
                  <p className="text-white text-sm">Junior</p>
                </div>
              </div>
            </div>
            {/* employee info */}
            <div className=" w-[300px]">
              <p className="text-black font-bold text-xl mb-5">Employee</p>
              <div className="flex justify-content w-full gap-14 mb-2">
                <p className="text-white font-bold">Employee Info</p>
                <p className="text-white">Time </p>
              </div>
              <div className="flex justify-content">
                <div className="flex">
                    <img src="/avatar.png" alt="" />
                    <div className="flex flex-col">
                        
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <TabelKaryawan employees={employees} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
