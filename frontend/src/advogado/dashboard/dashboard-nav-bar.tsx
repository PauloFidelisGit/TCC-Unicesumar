import { CustomButton } from "@/components/custom-buttons";
import { IconBaselineMenu } from "@/components/icons";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn/sheet";
import { IconType } from "@/lib/create-icon";
import { Close } from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { NavLink } from "react-router-dom";

export interface NavBarProps {
  items: {
    label: string;
    to: string;
    icon?: IconType;
  }[];
}

const desktopVariants = cva(
  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-zinc-900 dark:hover:text-zinc-50",
  {
    variants: {
      variant: {
        active: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50",
        inactive: "text-zinc-500 dark:text-zinc-400",
      },
    },
    defaultVariants: {
      variant: "inactive",
    },
  },
);

export function DesktopNavBarComponent({ items }: NavBarProps) {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {items?.map(({ label, icon: Icon, to }, index) => (
        <NavLink
          key={index}
          to={to}
          className={({ isActive }) =>
            isActive
              ? desktopVariants({ variant: "active" })
              : desktopVariants({ variant: "inactive" })
          }
          end
        >
          {Icon && <Icon className="h-4 w-4" />}
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

const mobileVariants = cva(
  "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-zinc-950 dark:hover:text-zinc-50",
  {
    variants: {
      variant: {
        active: "bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50",
        inactive: "text-zinc-500 dark:text-zinc-400",
      },
    },
    defaultVariants: {
      variant: "inactive",
    },
  },
);

export function MobileNavBarComponent({ items }: NavBarProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <CustomButton
          variant="outline"
          size="icon"
          className="ml-2 shrink-0 md:hidden"
          icon={IconBaselineMenu}
        />
      </SheetTrigger>
      <SheetTitle></SheetTitle>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <span className="flex items-center gap-2 text-lg font-semibold">
            AEON SISTEMAS
          </span>
          {items?.map(({ label, icon: Icon, to }, index) => (
            <NavLink
              key={index}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? mobileVariants({ variant: "active" })
                  : mobileVariants({ variant: "inactive" })
              }
              end
            >
              <Close className="flex flex-1 items-center gap-2">
                {Icon && <Icon className="h-4 w-4" />}
                {label}
              </Close>
            </NavLink>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
