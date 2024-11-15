import { forwardRef, LegacyRef } from "react";
import { Checkbox } from "./shadcn/checkbox";
import { FormControl, FormField, FormItem, FormLabel } from "./shadcn/form";

interface CustomCheckBoxProps extends React.RefAttributes<HTMLButtonElement> {
  name: string;
  value: string;
  label: string;
}
/* 
Exemple of use in array:

	<FormField
		name="items"
		render={() => (
			<FormItem>
				{allPermissions.map(({ label, value }, index) => {
					return (
						<div key={index}>
							<Heading as="h4">{label}</Heading>
							<div className="mt-2 space-y-2">
								{value.map(({ label, value }, index) => {
									return (
										<CustomCheckBox
											key={index}
											name="items"
											label={label}
											value={value}
										/>
									);
								})}
							</div>
						</div>
					);
				})}
			</FormItem>
		)}
	/>
	
*/
export const CustomCheckBox = forwardRef(
  ({ label, value, ...props }: CustomCheckBoxProps, ref: LegacyRef<any>) => (
    <FormField
      name="items"
      render={({ field }) => {
        return (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value?.includes(value)}
                onCheckedChange={(checked) => {
                  return checked
                    ? field.onChange([...field.value, value])
                    : field.onChange(
                        field.value?.filter(
                          (newValue: string) => newValue !== value,
                        ),
                      );
                }}
                {...props}
                ref={ref}
              />
            </FormControl>
            <FormLabel className="text-sm font-normal">{label}</FormLabel>
          </FormItem>
        );
      }}
    />
  ),
);
