import type { Task } from "@/schemas/task.schemas";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useTransition } from "react";
import UseTaskActions from "@/hooks/use-task-actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  task: Task;
}

const ItemTask = ({ task }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { deleteTask, toggleTaskCompletion } = UseTaskActions();

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        await deleteTask(task.id);
        toast.success("Task delete");
      } catch (error) {
        console.log(error);
        toast.error("Error deleting task");
      }
    });
  };

  const handleToggleCompletion = async () => {
    startTransition(async () => {
      try {
        await toggleTaskCompletion(task.id);
        toast.success("Task updated");
      } catch (error) {
        console.log(error);
        toast.error("Error toggling task completion");
      }
    });
  };

  return (
    <Card>
      <CardHeader className="">
        <CardTitle
          className={cn(
            "text-lg font-semibold",
            task.completed ? "line-through text-gray-500" : ""
          )}
        >
          {task.title}
        </CardTitle>
        <CardAction className="space-x-2">
          <Button
            disabled={isPending}
            variant={"outline"}
            onClick={handleToggleCompletion}
          >
            {task.completed ? "Incompleted " : "Completed"}
          </Button>
          <Button
            disabled={isPending}
            variant={"destructive"}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </CardAction>
        {task.description && (
          <CardContent
            className={cn(
              "font-semibold",
              task.completed ? "line-through text-gray-500" : ""
            )}
          >
            {task.description}
          </CardContent>
        )}
      </CardHeader>
    </Card>
  );
};

export default ItemTask;
