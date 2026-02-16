import { useFormContext } from "react-hook-form";

interface TextareaProps {
  name: string;
  label: string;
  rows?: number;
  placeholder?: string;
}

export default function Textarea({
  name,
  label,
  rows = 4,
  placeholder,
}: TextareaProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      <label className="text-md font-medium text-gray-700">{label}</label>

      <textarea
        rows={rows}
        placeholder={placeholder}
        {...register(name)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-md
                   resize-none
                   focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-200
                   focus:border-indigo-600"
      />

      {errors[name] && (
        <p className="text-xs text-red-500">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
}
