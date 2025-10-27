import FormTask from "@/components/tasks/form-task";
import TaskList from "@/components/tasks/list-task";
import { Suspense } from "react";

const TaskPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Tasks</h1>
      <FormTask />
      <Suspense fallback={<div>Loading tasks...</div>}>
        <TaskList />
      </Suspense>
    </div>
  );
};

export default TaskPage;
