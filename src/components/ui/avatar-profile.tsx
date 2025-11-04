import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { User } from "lucide-react";

interface AvatarProfileProps {
  src?: string | null;
  name?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-10 w-10",
  md: "h-16 w-16",
  lg: "h-24 w-24",
};

export function AvatarProfile({
  src,
  name,
  size = "md",
  className = "",
}: AvatarProfileProps) {
  const [imageError, setImageError] = useState(false);
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  const fallbackImage = `https://api.dicebear.com/7.x/initials/svg?seed=${
    name || "Guest"
  }`;

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      {!imageError && src ? (
        <AvatarImage
          src={src}
          alt={name || "Profile picture"}
          onError={() => setImageError(true)}
        />
      ) : (
        <AvatarImage src={fallbackImage} alt={name || "Profile picture"} />
      )}
      <AvatarFallback className="bg-primary/10">
        <User className="h-6 w-6 text-primary" />
      </AvatarFallback>
    </Avatar>
  );
}
