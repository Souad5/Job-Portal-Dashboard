import { useFormContext } from "react-hook-form";
import { FaAsterisk } from "react-icons/fa";

interface TextareaProps {
  name: string;
  label: string;
  rows?: number;
  placeholder?: string;
  required?: boolean;
}

export default function Textarea({
  name,
  label,
  rows = 4,
  placeholder,
  required,
}: TextareaProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      <label className="text-md flex gap-1 font-medium">
        {label} {required ? <FaAsterisk color="red" size={8} /> : ""}
      </label>

      <textarea
        rows={rows}
        placeholder={placeholder}
        {...register(name)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-md
                   resize-none
                   focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200
                   focus:border-blue-200"
      />

      {errors[name] && (
        <p className="text-xs text-red-500">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
}
