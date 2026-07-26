import React from 'react';

interface FileUploadProps {
  label: string;
  onChange: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, onChange }) => {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 dark:text-gray-300 font-medium mb-2">{label}</label>
      <input
        type="file"
        onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)}
        className="w-full text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 transition"
      />
    </div>
  );
};

export default FileUpload;
