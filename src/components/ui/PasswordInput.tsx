import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Input from "./Input";

interface PasswordInputProps {
  name: string;
  label: string;
  placeholder?: string;
}

export default function PasswordInput({
  name,
  label,
  placeholder,
}: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        name={name}
        label={label}
        placeholder={placeholder}
        type={show ? "text" : "password"}
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="
          absolute right-3 top-9.5
          text-gray-500 hover:text-gray-700
        "
      >
        {show ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>
    </div>
  );
}
