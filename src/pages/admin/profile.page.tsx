import FormProfile from "@/components/profile/form-profile";
import { useUser } from "reactfire";
import { AvatarProfile } from "@/components/ui/avatar-profile";

const ProfilePage = () => {
  const { data: user } = useUser();

  if (!user) {
    return <div className="text-red-500">Loading...</div>;
  }
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">
          Profile Settings
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Card */}
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <AvatarProfile
                src={user.photoURL}
                name={user.displayName}
                size="lg"
                className="border-2 border-primary/20"
              />
              <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-background bg-primary"></div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">
                {user.displayName || "Guest"}
              </h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="grid gap-1">
            <h3 className="font-medium leading-none">Account Details</h3>
            <p className="text-sm text-muted-foreground">
              Update your profile information and manage your account settings.
            </p>
          </div>

          <div className="grid gap-1">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium leading-none">Email Verification</h4>
                <p className="text-sm text-muted-foreground">
                  Your email verification status
                </p>
              </div>
              <div
                className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                  user.emailVerified
                    ? "bg-primary/10 text-primary"
                    : "bg-destructive/10 text-destructive"
                }`}
              >
                {user.emailVerified ? "Verified" : "Not Verified"}
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="space-y-6">
          <div className="grid gap-1">
            <h3 className="font-medium leading-none">Edit Profile</h3>
            <p className="text-sm text-muted-foreground">
              Make changes to your profile here.
            </p>
          </div>
          <FormProfile user={user} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
