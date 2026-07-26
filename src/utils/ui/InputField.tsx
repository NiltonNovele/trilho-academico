import React from 'react';

interface InputFieldProps {
  label: string;
  type?: string;
  value: string | number;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  value,
  placeholder,
  onChange,
  min,
  max,
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 dark:text-gray-300 font-medium mb-2">{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        min={min}
        max={max}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition"
      />
    </div>
  );
};

export default InputField;
