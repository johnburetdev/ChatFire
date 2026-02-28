import FormTask from "@/components/tasks/form-task";
import TaskList from "@/components/tasks/list-task";
import { Suspense } from "react";

const TaskPage = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Tasks</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-[350px_1fr]">
        {/* Form Section */}
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
            <FormTask />
          </div>
        </div>

        {/* Tasks List Section */}
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-6">
            <Suspense 
              fallback={
                <div className="flex items-center justify-center h-32 text-muted-foreground">
                  Loading tasks...
                </div>
              }
            >
              <TaskList />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPage;
