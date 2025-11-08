import React from 'react';
import { Shift } from '../lib/mockData';

interface ShiftCellProps {
  shift: Shift;
  roleName: string;
}

const roleColors: Record<string, string> = {
  Manager: 'bg-red-500/80 border-red-400',
  Chef: 'bg-orange-500/80 border-orange-400',
  Server: 'bg-blue-500/80 border-blue-400',
  Cashier: 'bg-green-500/80 border-green-400',
  Barista: 'bg-yellow-500/80 border-yellow-400 text-slate-800',
  Owner: 'bg-purple-500/80 border-purple-400', // Owner is a permission, but good to have a color
  'Default': 'bg-gray-500/80 border-gray-400'
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};


const ShiftCell: React.FC<ShiftCellProps> = ({ shift, roleName }) => {
  const isDraft = shift.status === 'draft';
  const colorClasses = roleColors[roleName] || roleColors['Default'];

  const containerClasses = `
    h-full p-2 rounded-lg text-xs flex flex-col justify-center
    cursor-grab transition-all duration-200 hover:shadow-lg hover:scale-105 border
    ${isDraft 
      ? 'border-dashed border-slate-500 bg-slate-800/50 text-slate-400' 
      : `${colorClasses} shadow-md`}
  `;

  const handleDragStart = (e: React.DragEvent) => {
    // Placeholder for drag-and-drop data transfer
    e.dataTransfer.setData('application/json', JSON.stringify(shift));
    console.log(`Dragging shift ID: ${shift.id}`);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={containerClasses}
      title={`Shift for ${roleName}: ${formatTime(shift.startTime)} - ${formatTime(shift.endTime)} (${shift.status})`}
    >
      <div className="font-bold text-sm">{`${formatTime(shift.startTime)}`}</div>
      <div className="text-sm">{`${formatTime(shift.endTime)}`}</div>
      {isDraft && <div className="italic mt-1 text-center">(Draft)</div>}
    </div>
  );
};

export default ShiftCell;