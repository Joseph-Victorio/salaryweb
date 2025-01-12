const TabelKaryawan = ({ employees }) => {
  const hapus = (e) => {};
  return (
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
            <td className="p-3 flex items-center gap-3  border-b">
              <img
                src={employee.avatar}
                alt={employee.name}
                className="w-8 h-8 rounded-full"
              />
              {employee.name}
            </td>
            <td className="p-3 border-b">{employee.id}</td>
            <td className="p-3  border-b">{employee.pangkat}</td>
            <td className="border-b ">
              <div className="flex gap-5 justify-center">
              <span className="bg-white px-2 rounded-lg text-black">{employee.time}</span>
              <span className="bg-white px-2 rounded-lg text-black">{employee.time}</span>
              </div>
            </td>
            <td className="p-3  border-b">
              <button onClick={hapus(employee.id)}>
                <img src="/minus.png" alt="" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelKaryawan;
