import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { FaCirclePlus } from "react-icons/fa6";
import toast from "react-hot-toast";

const Employee = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    pass: "",
    nama_depan: "",
    nama_belakang: "",
    nomor_telp: "",
    jenis_kelamin: "Lelaki",
    alamat: "",
  });

  // Fetch employees data
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/karyawan");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/karyawan", formData);
      fetchEmployees();
      closeModal();
      if (res.status == 200) {
        toast.success("Berhasil Menambahkan Karyawan Baru!");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const addTaskBtn = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      username: "",
      email: "",
      pass: "",
      nama_depan: "",
      nama_belakang: "",
      nomor_telp: "",
      jenis_kelamin: "Lelaki",
      alamat: "",
    });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const hapus = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/karyawan/${id}`);
      fetchEmployees();
      if (res.status == 200) {
        toast.success("Karyawan berhasil dihapus!");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast.error("Gagal menghapus karyawan!");
    }
  };

  return (
    <div className="flex bg-gradient-to-b from-[#004D40] via-[#00897B] to-[#4DB6AC]">
      <Sidebar />
      <div className="ml-64 w-full border-l-2 border-black">
        <div className="p-5 flex items-center justify-between w-full">
          <img src="/logo_tulisan.svg" alt="" className="mx-auto" />
          <div className="flex items-center gap-3 float-right">
            <div>
              <p>Situ Nur</p>
              <span className="text-sm text-black">Admin</span>
            </div>
            <img
              src="/avatar.png"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
        <div className="flex justify-between px-20">
          <h2 className="text-white font-bold">Employee</h2>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <input
                type="text"
                name="search"
                className="rounded-lg border-black border-2 bg-none pl-8"
                placeholder="Search"
              />
              <img
                src="/glass.svg"
                alt=""
                className="absolute top-1 left-2 w-4 "
              />
            </div>
            <button onClick={addTaskBtn}>
              <FaCirclePlus className="text-4xl text-white" />
            </button>
          </div>
        </div>
        <main className="p-10 bg-background min-h-screen">
          <div className="mt-10">
            <table className="w-full bg-foreground text-white rounded-lg shadow-md">
              <thead>
                <tr className="text-left bg-primary text-black">
                  <th className="p-3  border-b">Employee</th>
                  <th className="p-3  border-b">Employee ID</th>
                  <th className="p-3  border-b">Pangkat</th>
                  <th className="p-3  border-b text-center">Time</th>
                  <th className="p-3  border-b"></th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, index) => (
                  <tr key={index} className="hover:bg-background">
                    <td className="p-3 flex items-center gap-3 border-b text-black font-bold">
                      <img
                        src={'/avatar.png'}
                        alt={employee.name}
                        className="w-8 h-8 rounded-full"
                      />
                      {employee.nama_depan + " "  + employee.nama_belakang} 
                    </td>
                    <td className="p-3 border-b">{employee.id}</td>
                    <td className="p-3 border-b">{employee.pangkat}</td>
                    <td className="border-b">
                      <div className="flex gap-5 justify-center">
                        <span className="bg-white px-2 rounded-lg text-black">
                          {employee.time}
                        </span>
                        <span className="bg-white px-2 rounded-lg text-black">
                          {employee.time}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 border-b">
                      <button onClick={() => hapus(employee.id)}>
                        <img src="/minus.png" alt="" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg md:w-[700px]">
            <h3 className="text-xl font-bold mb-4">Tambah Karyawan</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="flex gap-10 md:flex-row flex-col">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-teal-500 focus:ring-teal-500 border-2 pl-2"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md border-black border-2 shadow-sm focus:border-teal-500 focus:ring-teal-500 pl-2"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-md border-2 border-black shadow-sm focus:border-teal-500 focus:ring-teal-500 pl-2"
                    name="pass"
                    value={formData.pass}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <p className="text-gray-400">Data Pribadi</p>
              <div className="flex gap-10 md:flex-row flex-col">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Nama Depan
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-black shadow-sm focus:border-teal-500 focus:ring-teal-500 border-2 pl-2"
                    name="nama_depan"
                    value={formData.nama_depan}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Nama Belakang
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-black border-2 shadow-sm focus:border-teal-500 focus:ring-teal-500 pl-2"
                    name="nama_belakang"
                    value={formData.nama_belakang}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Nomor Telepon
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-2 border-black shadow-sm focus:border-teal-500 focus:ring-teal-500 pl-2"
                    name="nomor_telp"
                    value={formData.nomor_telp}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex gap-10 md:flex-row flex-col">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Jenis Kelamin
                  </label>
                  <select
                    name="jenis_kelamin"
                    className="border-2 border-black rounded-lg w-[188px]"
                    value={formData.jenis_kelamin}
                    onChange={handleInputChange}
                  >
                    <option value="Lelaki">Lelaki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Alamat
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-black border-2 shadow-sm focus:border-teal-500 focus:ring-teal-500  pl-2"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                  onClick={closeModal}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
