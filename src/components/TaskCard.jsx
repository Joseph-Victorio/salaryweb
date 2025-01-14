const TaskCard = ({ project }) => {
    return (
        <div className="bg-foreground px-5 py-2 rounded-lg shadow-md text-sm border w-[250px]">
            <div className="flex gap-2 items-center">
                <img src="/folder.png" alt="" />
            <h3 className="text-primary font-bold text-green-400">{project}</h3>
            </div>
        </div>
    );
};

export default TaskCard;
