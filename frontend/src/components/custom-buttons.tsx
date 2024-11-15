import { IconType } from "@/lib/create-icon";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { NavLink } from "react-router-dom";
import { IconBaselineContentCopy } from "./icons";
import { Button, ButtonProps } from "./shadcn/button";
import { Spinner } from "./spinner";

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
  label?: string;
  loadingLabel?: string;
  icon?: IconType;
  to?: string;
  iconSize?: number;
}
export const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      label,
      loading,
      loadingLabel,
      icon: Icon,
      className,
      iconSize = 20,
      to,
      type = "button",
      ...props
    },
    ref,
  ) => {
    return (
      <>
        {to ? (
          <NavLink to={props.disabled ? "" : to}>
            <Button
              className={cn("flex h-fit items-center gap-1", className)}
              ref={ref}
              {...props}
              type={type}
            >
              {loading ? (
                <>
                  <Spinner color="white" size="4" className="mr-2" />
                  <span className="whitespace-nowrap">{loadingLabel}</span>
                </>
              ) : (
                <>
                  {Icon && <Icon size={iconSize} />}
                  {label && <span className="whitespace-nowrap">{label}</span>}
                </>
              )}
            </Button>
          </NavLink>
        ) : (
          <Button
            className={cn("flex h-fit items-center gap-1", className)}
            ref={ref}
            {...props}
            type={type}
          >
            {loading ? (
              <>
                <Spinner color="white" size="4" className="mr-2" />
                <span className="whitespace-nowrap">{loadingLabel}</span>
              </>
            ) : (
              <>
                {Icon && <Icon size={iconSize} />}
                {label && <span className="whitespace-nowrap">{label}</span>}
              </>
            )}
          </Button>
        )}
      </>
    );
  },
);

interface CopyButtonProps {
  onClick: () => void;
}
export function CopyButton({ onClick }: CopyButtonProps) {
  return (
    <CustomButton
      variant="ghost"
      className="h-fit p-0"
      onClick={onClick}
      icon={IconBaselineContentCopy}
    />
  );
}
