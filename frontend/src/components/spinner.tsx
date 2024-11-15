import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Text } from "./typography";

const spinnerVariants = cva(
  "animate-spin rounded-full border-2 border-solid border-t-transparent",
  {
    variants: {
      size: {
        "4": "size-4",
        "5": "size-5",
        "10": "size-10",
      },
      color: {
        white: "border-white",
        black: "border-black",
      },
    },
    defaultVariants: {
      size: "5",
      color: "black",
    },
  },
);

interface Props extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

export function Spinner({ size, color, className }: Props) {
  return (
    <div className="flex w-fit items-center justify-center">
      <div className={spinnerVariants({ size, color, className })}></div>
    </div>
  );
}

interface DefaultSpinnerFallbackProps {
  className?: string;
}
export function DefaultSpinnerFallback({
  className,
}: DefaultSpinnerFallbackProps) {
  return (
    <div
      className={cn(
        "m-auto flex w-fit flex-col items-center text-center",
        className,
      )}
    >
      <Spinner size="10" color="black" />
      <Text>Carregando...</Text>
    </div>
  );
}
