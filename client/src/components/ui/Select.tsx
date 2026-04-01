import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { useFormContext } from "react-hook-form";

interface SelectProps {
  name: string;
  label: string;
  options: string[];
}

export default function Select({ name, label, options }: SelectProps) {
  const { setValue, watch, register } = useFormContext();
  const selectedValue = watch(name) || options[0];

  return (
    <div className="space-y-1 min-w-full sm:w-1/3">
      <label className="text-md font-medium">{label}</label>

      <SelectPrimitive.Root
        value={selectedValue}
        onValueChange={(val) => setValue(name, val)}
      >
        <SelectPrimitive.Trigger className="w-full mt-1.5 flex justify-between items-center px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-md text-md focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white dark:bg-slate-700 cursor-pointer">
          <SelectPrimitive.Value>{selectedValue}</SelectPrimitive.Value>
          <SelectPrimitive.Icon>
            <ChevronDown className="w-4 h-4 text-gray-500 dark:text-white" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Content className="overflow-hidden rounded-md border border-blue-200 bg-white dark:bg-slate-500  shadow-lg z-50 ">
          <SelectPrimitive.Viewport className="p-1">
            {options.map((opt) => (
              <SelectPrimitive.Item
                key={opt}
                value={opt}
                className="relative flex items-center px-3 py-2 rounded-md text-gray-700 dark:text-white text-sm cursor-pointer hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
              >
                <SelectPrimitive.ItemText>{opt}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Root>

      {/* Hidden input for react-hook-form */}
      <input type="hidden" {...register(name)} />
    </div>
  );
}
