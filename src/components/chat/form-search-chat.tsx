import {
  emailFriendZodSchema,
  type EmailFriendZodSchema,
} from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { UserRoomActions } from "@/hooks/use-room-actions";
import { toast } from "sonner";
import { Search } from "lucide-react";

interface Props {
  handleClickRoomId: (id: string) => void;
}

const FormSearchChat = ({ handleClickRoomId }: Props) => {
  const [isLoading, startTransition] = useTransition();
  const { findOrCreateRoom } = UserRoomActions();

  const form = useForm<EmailFriendZodSchema>({
    resolver: zodResolver(emailFriendZodSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: EmailFriendZodSchema) {
    startTransition(async () => {
      const response = await findOrCreateRoom(values.email);

      if (response.success) {
        handleClickRoomId(response.roomId);
        form.reset();
        return;
      }
      toast.error(response.message);
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="relative">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="Search by email..." 
                    className="pr-12"
                    {...field} 
                  />
                </FormControl>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? (
                    <span className="h-4 w-4 animate-spin">...</span>
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default FormSearchChat;
