import React, { useState, useRef, useEffect } from 'react';

interface Option {
    value: number;
    label: string;
}

interface MultiSelectDropdownProps {
    options: Option[];
    selectedValues: number[];
    onChange: (selected: number[]) => void;
    placeholder?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({ options, selectedValues, onChange, placeholder = 'Select...' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (value: number) => {
        const newSelected = selectedValues.includes(value)
            ? selectedValues.filter(v => v !== value)
            : [...selectedValues, value];
        onChange(newSelected);
    };

    const getLabel = (value: number) => options.find(o => o.value === value)?.label || '';

    return (
        <div className="relative" ref={containerRef}>
            <div className="flex flex-wrap gap-2 p-2 border border-slate-600 bg-slate-700 rounded-md min-h-[42px] cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                {selectedValues.length === 0 && <span className="text-slate-400 px-1">{placeholder}</span>}
                {selectedValues.map(value => (
                    <div key={value} className="flex items-center gap-1 bg-indigo-600 text-white rounded-full px-2 py-0.5 text-sm">
                        <span>{getLabel(value)}</span>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSelect(value);
                            }}
                            className="text-indigo-200 hover:text-white"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-600 rounded-md shadow-lg max-h-60 overflow-auto">
                    {options.map(option => (
                        <div
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className={`p-2 cursor-pointer hover:bg-slate-700 ${selectedValues.includes(option.value) ? 'bg-indigo-900/50' : ''}`}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;