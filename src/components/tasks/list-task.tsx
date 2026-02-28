import UseTaskActions from "@/hooks/use-task-actions";
import ItemTask from "./item-task";

const TaskList = () => {
  const { tasks } = UseTaskActions();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Your Tasks</h2>
        <span className="text-sm text-muted-foreground">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No tasks yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <ItemTask key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
