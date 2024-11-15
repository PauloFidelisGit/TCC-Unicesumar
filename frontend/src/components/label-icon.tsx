import { IconType } from "@/lib/create-icon";
import { cn } from "@/lib/utils";

export default function LabelIcon({
  icon: Icon,
  label,
  className,
}: {
  icon: IconType;
  label?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Icon size={17} />
      {label}
    </div>
  );
}
