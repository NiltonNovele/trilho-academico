import React from 'react';

interface Option {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}

const SelectField: React.FC<SelectFieldProps> = ({ label, value, onChange, options }) => {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 dark:text-gray-300 font-medium mb-2">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
