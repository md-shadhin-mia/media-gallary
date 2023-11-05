import { FC, useState } from "react";

type Props = {
    label: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
}


const Checkbox:FC<Props> = ({ label, checked, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = (ev:React.ChangeEvent) => {
    ev.stopPropagation()
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }

    
  };

  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="hidden"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <div className={`w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center ${isChecked ? 'bg-indigo-500 border-indigo-500' : ''}`}>
        {isChecked && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <span className="ml-2">{label}</span>
    </label>
  );
};

export default Checkbox;
