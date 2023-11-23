import React, { useState } from 'react';
interface AccordionItemProps {
  title: string;
  points?: string[]; 
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, points }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="mb-4">
    <div
      className="flex justify-between items-center bg-gray-500 p-2 cursor-pointer"
      onClick={toggleAccordion}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <span>{isOpen ? '▲' : '▼'}</span>
    </div>
    {isOpen && (
      <div className="bg-gray-100 p-2">
        {points && (
          <ul className="list-disc ml-4">
            {points.map((point, index) => (
              <li key={index} className="mb-1">{point}</li>
            ))}
          </ul>
        )}
      </div>
    )}
  </div>
);
};
export default AccordionItem;