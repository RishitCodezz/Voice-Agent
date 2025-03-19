import { cn } from "@/lib/utils";

interface AvatarProps {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const Avatar = ({ name, className, size = "md" }: AvatarProps) => {
  // Get first letter of name, uppercase
  const letter = name?.charAt(0).toUpperCase() || "U";

  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
  };

  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-br from-primary-200 to-primary-100 flex items-center justify-center font-semibold text-dark-100 transition-all duration-300 hover:scale-105 hover:shadow-lg",
        sizeClasses[size],
        className
      )}
    >
      {letter}
    </div>
  );
};

export default Avatar;
