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
      {/* Label */}
      <label className="text-md flex gap-1 font-medium text-gray-700 dark:text-gray-200">
        {label}{" "}
        {required && <FaAsterisk className="text-red-500 mt-1" size={8} />}
      </label>

      {/* Textarea */}
      <textarea
        rows={rows}
        placeholder={placeholder}
        {...register(name)}
        className="
          w-full rounded-md border px-3 py-2 text-md resize-none
          border-gray-300 bg-white text-gray-900
          dark:border-gray-600 dark:bg-slate-700 dark:text-gray-100
          focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-200
          transition-all duration-200 focus:border-blue-200 dark:focus:border-blue-200
        "
      />

      {/* Error Message */}
      {errors[name] && (
        <p className="text-xs text-red-500 dark:text-red-400">
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
}
