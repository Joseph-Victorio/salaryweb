import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LoginKaryawan = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Username and password are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login-karyawan", {
        username,
        pass: password,
      });

      if (response.data.success) {
        toast.success("Login successful!");
        localStorage.setItem("username", username);
        navigate("/absen"); 
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to connect to the server.");
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#004D40] via-[#00897B] to-[#4DB6AC] p-4">
      <div className="flex gap-5">
        <img src="/logo.svg" alt="logo" className="w-14" />
        <img src="/logo_tulisan.svg" alt="tulisan" className="w-14" />
      </div>

      <form
        onSubmit={handleLogin}
        className="bg-[url('bg_register.png')] w-[350px] h-[450px] bg-cover mt-5 mx-auto rounded-lg p-1"
      >
        <div className="flex justify-center m-2">
          <img src="/logo.svg" alt="logo" className="w-10" />
        </div>
        <div className="flex justify-center m-2">
          <img src="/logo_tulisan.svg" alt="tulisan" className="w-10" />
        </div>
        <p className="text-white font-sixtyFour font-bold text-[12px] text-center">
          LOGIN
        </p>

        <div className="flex-col p-5 flex justify-center w-[300px] mx-auto gap-3">
          <input
            type="text"
            name="username"
            placeholder="USERNAME"
            className="p-2 rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="pass"
            placeholder="PASSWORD"
            className="p-2 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-white rounded-lg px-4 py-2 flex justify-center w-full group transition-colors duration-300 ease-in-out"
          >
            <p className="text-black opacity-40 group-hover:opacity-100 transition-colors duration-300 ease-in-out">
              LOGIN
            </p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginKaryawan;
