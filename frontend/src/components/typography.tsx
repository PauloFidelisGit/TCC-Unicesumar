import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

const textVariants = cva("", {
  variants: {
    variant: {
      default: "",
      muted: "text-zinc-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
interface TextProps extends VariantProps<typeof textVariants> {
  children: ReactNode;
  className?: string;
}
export function Text({ children, className, variant }: TextProps) {
  return <p className={textVariants({ variant, className })}>{children}</p>;
}

const headingVariants = cva("font-semibold tracking-tight", {
  variants: {
    variant: {
      h1: "text-3xl",
      h2: "text-2xl",
      h3: "text-xl",
      h4: "text-lg",
      h5: "text-base",
      h6: "text-sm",
    },
  },
  defaultVariants: {
    variant: "h1",
  },
});

interface HeadingProps extends VariantProps<typeof headingVariants> {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}
export function Heading({ children, className, as }: HeadingProps) {
  switch (as) {
    case "h1":
      return (
        <h1 className={headingVariants({ variant: "h1", className })}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 className={headingVariants({ variant: "h2", className })}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 className={headingVariants({ variant: "h3", className })}>
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 className={headingVariants({ variant: "h4", className })}>
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5 className={headingVariants({ variant: "h5", className })}>
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6 className={headingVariants({ variant: "h6", className })}>
          {children}
        </h6>
      );
    default:
      return (
        <h1 className={headingVariants({ variant: "h1", className })}>
          {children}
        </h1>
      );
  }
}
