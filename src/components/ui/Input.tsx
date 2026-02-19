import { useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  required: boolean;
}

export default function Input({
  name,
  label,
  type = "text",
  placeholder,
}: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      <label className="text-md font-medium">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-md
                   focus:outline-none focus:ring-2 transition-all duration-200 focus:ring-blue-200"
      />
      {errors[name] && (
        <p className="text-xs text-red-500">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
}
