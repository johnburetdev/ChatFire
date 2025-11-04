import { useProfileActions } from "@/hooks/use-profile-actions";
import { profileZodSchema, type ProfileZodSchemaType } from "@/lib/zod-schema";
import { AvatarProfile } from "../ui/avatar-profile";
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
import type { User } from "firebase/auth";
import { toast } from "sonner";

interface Props {
  user: User;
}

const FormProfile = ({ user }: Props) => {
  const { loading, updateUserProfile } = useProfileActions();

  const form = useForm<ProfileZodSchemaType>({
    resolver: zodResolver(profileZodSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    },
  });

  async function onSubmit(values: ProfileZodSchemaType) {
    const result = await updateUserProfile(values);
    if (result.success) {
      return toast.success("Profile update sucessfully");
    }
    toast.error("Error updating profile");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your display name"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="photoURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Picture URL</FormLabel>
                <FormControl>
                  <div className="grid gap-2">
                    <Input
                      placeholder="https://example.com/photo.jpg"
                      {...field}
                      className="w-full"
                    />
                    {field.value && (
                      <div className="relative">
                        <AvatarProfile
                          src={field.value}
                          name={form.getValues("displayName")}
                          size="md"
                          className="border border-border"
                        />
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={loading} className="w-full sm:w-auto">
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Updating...
              </span>
            ) : (
              "Update Profile"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="w-full sm:w-auto"
          >
            Reset Changes
          </Button>
        </div>
      </form>
    </Form>
  );
};
export default FormProfile;
