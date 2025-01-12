import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    nama: "",
    nama_perusahaan: "",
    email: "",
    pass: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register", formData);
      toast.success("Admin Berhasil Terdaftar!");
      setFormData({
        nama: "",
        nama_perusahaan: "",
        email: "",
        pass: "",
      });
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : "Something went wrong.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#008F66] via-[#00B88C] to-[#00E6B0] h-screen p-5">
      <div className="flex gap-5">
        <img src="/logo.svg" alt="logo" className="w-14" />
        <img src="/logo_tulisan.svg" alt="tulisan" className="w-14" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-[url('bg_register.png')] w-[350px] h-[450px] bg-cover mt-5 mx-auto rounded-lg p-1"
      >
        <div className="flex justify-center m-2">
          <img src="/logo.svg" alt="logo" className="w-10" />
        </div>
        <div className="flex justify-center m-2">
          <img src="/logo_tulisan.svg" alt="tulisan" className="w-10" />
        </div>
        <p className="text-white font-sixtyFour font-bold text-[12px] text-center">
          Register
        </p>

        <div className="flex-col p-5 flex justify-center w-[300px] mx-auto gap-3">
          <input
            type="text"
            name="nama"
            placeholder="NAMA"
            className="p-2 rounded-lg"
            value={formData.nama}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nama_perusahaan"
            placeholder="NAMA PERUSAHAAN"
            className="p-2 rounded-lg"
            value={formData.nama_perusahaan}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            className="p-2 rounded-lg"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="pass"
            placeholder="PASSWORD"
            className="p-2 rounded-lg"
            value={formData.pass}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-white rounded-lg px-4 py-2 flex justify-center w-full mt-5 group transition-colors duration-300 ease-in-out"
          >
            <p className="text-black opacity-40 group-hover:opacity-100 transition-colors duration-300 ease-in-out">
              REGISTER NOW
            </p>
          </button>
        </div>

        <a href="/" className="text-center w-full">
          <p className="text-[#2500F4] font-bold">LOGIN ADMIN</p>
        </a>
      </form>
    </div>
  );
};

export default Register;
