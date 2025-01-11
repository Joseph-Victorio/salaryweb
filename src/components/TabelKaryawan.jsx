const TabelKaryawan = ({ employees }) => {
    return (
        <table className="w-full bg-foreground text-white rounded-lg shadow-md">
            <thead>
                <tr className="text-left bg-primary text-black">
                    <th className="p-3">Employee</th>
                    <th className="p-3">ID</th>
                    <th className="p-3">Pangkat</th>
                    <th className="p-3">Time</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((employee, index) => (
                    <tr
                        key={index}
                        className="hover:bg-background cursor-pointer"
                    >
                        <td className="p-3 flex items-center gap-3">
                            <img
                                src={employee.avatar}
                                alt={employee.name}
                                className="w-8 h-8 rounded-full"
                            />
                            {employee.name}
                        </td>
                        <td className="p-3">{employee.id}</td>
                        <td className="p-3">{employee.pangkat}</td>
                        <td className="p-3">{employee.time}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TabelKaryawan;
