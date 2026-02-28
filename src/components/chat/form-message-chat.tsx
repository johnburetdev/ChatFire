import { messageZodSchema, type messageZodSchemaType } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMessagesActions } from "@/hooks/use-messages-actions";
import { toast } from "sonner";
import { useTransition } from "react";
import { Send } from "lucide-react";

interface Props {
  roomId: string;
}

const FormMessageChat = ({ roomId }: Props) => {
  const { sendMessage } = useMessagesActions(roomId);
  const [isLoading, startTransition] = useTransition();

  const form = useForm<messageZodSchemaType>({
    resolver: zodResolver(messageZodSchema),
    defaultValues: {
      text: "",
    },
  });

  async function onSubmit(values: messageZodSchemaType) {
    startTransition(async () => {
      try {
        await sendMessage(values.text);
        form.reset();
      } catch (error) {
        console.log(error);
        toast.error("Error sending message");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input 
                  placeholder="Write a message..." 
                  className="focus-visible:ring-1"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size="sm" disabled={isLoading} type="submit">
          {isLoading ? (
            <span className="h-4 w-4 animate-spin">...</span>
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </Form>
  );
};
export default FormMessageChat;
