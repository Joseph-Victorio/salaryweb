const TaskCard = ({ project, time,value }) => {
    return (
        <div className="bg-foreground px-5 py-2 rounded-lg shadow-md text-sm border">
            <div className="flex gap-2">
                <img src="/folder.png" alt="" />
            <h3 className="text-primary font-bold text-green-400">{project}</h3>
            </div>
            <div className="flex justify-between items-center mt-3">
                <span className="bg-white rounded-lg px-2 py-1">{time}</span>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    className="w-full ml-3 accent-red-500"
                    readOnly
                />
            </div>
        </div>
    );
};

export default TaskCard;
