import * as SwitchPrimitives from "@radix-ui/react-switch";
import { forwardRef } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./shadcn/form";
import { Switch } from "./shadcn/switch";

interface CustomSwitchProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    "onChange"
  > {
  name: string;
  label?: string;
  description?: string;
  onChange?: ({
    onChange,
    value,
  }: {
    onChange: (...event: any[]) => void;
    value: string;
  }) => void;
}

export const ControlledInputSwitch = forwardRef<HTMLDivElement, CustomSwitchProps>(
  ({ label, description, ...props }, ref) => (
    <FormField
      name={props.name}
      render={({ field }) => (
        <FormItem
          ref={ref}
          className="flex h-10 flex-row items-center justify-between rounded-lg border p-3 shadow-sm"
        >
          <div>
            <FormLabel>{label}</FormLabel>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              className="!mt-0"
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  ),
);
