import React from 'react';

interface Props {
  logo?: string | undefined;
  label: string;
}

export default function EducationNode({ logo, label }: Props): React.JSX.Element {
  return (
    <div className="w-16 h-16 rounded-full bg-white p-2 shadow-md flex items-center justify-center -mt-8 z-20">
      {logo ? (
        <img src={logo} alt={label} className="w-full h-full object-contain rounded-full" />
      ) : (
        <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
          {label.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}
