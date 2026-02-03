import { useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  type?: string;
}

export default function Input({ name, label, type = "text" }: InputProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1">
      <label className="text-md font-medium text-gray-700">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-md
                   focus:outline-none focus:ring-2 focus:ring-indigo-600"
      />
      {errors[name] && (
        <p className="text-xs text-red-500">{String(errors[name]?.message)}</p>
      )}
    </div>
  );
}
