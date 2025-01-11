import React from "react";

const Login = () => {
  return (
    <div className="bg-gradient-to-b from-[#004D40] via-[#00897B] to-[#4DB6AC] p-4">
      <div className="flex gap-5">
        <img src="/logo.svg" alt="logo" className="w-14" />
        <img src="/logo_tulisan.svg" alt="tulisan" className="w-14" />
      </div>

      <form
        action=""
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
            name="email"
            placeholder="EMAIL"
            className="p-2 rounded-lg"
          />
          <input
            type="password"
            name="pass"
            placeholder="PASSWORD"
            className="p-2 rounded-lg"
          />

          <button
            type="submit"
            className="bg-white rounded-lg px-4 py-2 flex justify-center w-full  group transition-colors duration-300 ease-in-out"
          >
            <p className="text-black opacity-40 group-hover:opacity-100  transition-colors duration-300 ease-in-out">
              LOGIN
            </p>
          </button>
        </div>
        <a href="/register" className="text-center w-full">
          <p className="text-white font-bold">REGISTER</p>
        </a>
      </form>
    </div>
  );
};

export default Login;
