import { useFormContext } from "react-hook-form";

interface SelectProps {
  name: string;
  label: string;
  options: string[];
}

export default function Select({ name, label, options }: SelectProps) {
  const { register } = useFormContext();

  return (
    <div className="space-y-1">
      <label className="text-md font-medium">{label}</label>
      <select
        {...register(name)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-md
                   focus:outline-none focus:ring-2 focus:ring-blue-200"
      >
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
