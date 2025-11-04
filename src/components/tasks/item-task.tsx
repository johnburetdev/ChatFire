import type { Task } from "@/schemas/task.schemas";
import { Check, X, Square, CheckSquare, Trash2 } from "lucide-react";
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
    <Card
      className={cn(
        "transition-colors duration-200",
        task.completed ? "bg-muted/50" : "bg-card hover:bg-accent/5"
      )}
    >
      <CardHeader className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 flex-1">
            <CardTitle
              className={cn(
                "text-base font-semibold line-clamp-2",
                task.completed && "text-muted-foreground line-through"
              )}
            >
              {task.title}
            </CardTitle>
            {task.description && (
              <CardContent className="p-0">
                <p
                  className={cn(
                    "text-sm text-muted-foreground line-clamp-2",
                    task.completed && "line-through"
                  )}
                >
                  {task.description}
                </p>
              </CardContent>
            )}
          </div>

          <CardAction className="flex gap-2 items-start">
            <Button
              disabled={isPending}
              variant="ghost"
              onClick={handleToggleCompletion}
              size="sm"
              className={cn(
                "h-8",
                task.completed
                  ? "hover:bg-destructive/10 hover:text-destructive"
                  : "hover:bg-primary/10 hover:text-primary"
              )}
            >
              {task.completed ? (
                <X className="h-4 w-4 mr-2" />
              ) : (
                <Check className="h-4 w-4 mr-2" />
              )}
              {task.completed ? "Undo" : "Complete"}
            </Button>
            <Button
              disabled={isPending}
              variant="ghost"
              onClick={handleDelete}
              size="sm"
              className="h-8 hover:bg-destructive/10 hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </CardAction>
        </div>
      </CardHeader>
    </Card>
  );
};

export default ItemTask;
