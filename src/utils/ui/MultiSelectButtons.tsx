import React from 'react';

interface MultiSelectButtonsProps {
  options: string[];
  selected: string[];
  onSelect: (value: string) => void;
  color?: string; // tailwind color: 'blue', 'green', etc.
}

const MultiSelectButtons: React.FC<MultiSelectButtonsProps> = ({
  options,
  selected,
  onSelect,
  color = 'blue',
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`px-4 py-2 rounded-full font-medium transition ${
              isSelected
                ? `bg-${color}-600 text-white`
                : `bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-${color}-100 dark:hover:bg-${color}-700`
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default MultiSelectButtons;
