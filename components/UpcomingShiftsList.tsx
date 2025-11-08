
import React from 'react';
import { Shift } from '@/lib/mockData';

interface UpcomingShiftsListProps {
    shifts: Shift[];
}

const UpcomingShiftsList: React.FC<UpcomingShiftsListProps> = ({ shifts }) => {
    const dateFormatter = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    return (
        <div className="bg-slate-800 rounded-lg shadow-lg p-4 h-full">
            <h3 className="text-lg font-bold text-white mb-4">Upcoming Shifts</h3>
            {shifts.length > 0 ? (
                <ul className="space-y-3">
                    {shifts.slice(0, 5).map(shift => (
                        <li key={shift.id} className="bg-slate-700/50 p-3 rounded-md">
                            <p className="font-semibold text-white">{dateFormatter.format(shift.startTime)}</p>
                            <p className="text-sm text-slate-300">
                                {timeFormatter.format(shift.startTime)} - {timeFormatter.format(shift.endTime)}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-slate-400 text-sm">No upcoming shifts scheduled.</p>
            )}
        </div>
    );
};

export default UpcomingShiftsList;