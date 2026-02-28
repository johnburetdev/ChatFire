import { taskZodSchema, type TaskZodSchemaType } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTransition } from "react";
import UseTaskActions from "@/hooks/use-task-actions";
import { toast } from "sonner";

const FormTask = () => {
  const [isPending, startTransition] = useTransition();
  const { createTask } = UseTaskActions();
  const form = useForm<TaskZodSchemaType>({
    resolver: zodResolver(taskZodSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  function onSubmit(values: TaskZodSchemaType) {
    startTransition(async () => {
      try {
        await createTask(values);
      } catch (error) {
        toast.error("An error occurred while saving the task:");
        console.log(error);
      } finally {
        form.reset();
      }
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Title</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter task title..." 
                  className="focus-visible:ring-1"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Description</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Add task details..." 
                  className="focus-visible:ring-1"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          disabled={isPending} 
          type="submit"
          className="w-full"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin">...</span>
              Creating...
            </span>
          ) : (
            "Create Task"
          )}
        </Button>
      </form>
    </Form>
  );
};
export default FormTask;
