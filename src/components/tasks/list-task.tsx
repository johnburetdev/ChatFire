import UseTaskActions from "@/hooks/use-task-actions";
import ItemTask from "./item-task";

const TaskList = () => {
  const { tasks } = UseTaskActions();

  return (
    <div className="space-y-4 mt-4">
      {tasks.map((task) => (
        <ItemTask key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
