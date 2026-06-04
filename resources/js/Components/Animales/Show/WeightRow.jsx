const WeightRow = ({ record, isLast, fmt }) => (
    <div
        className={`flex items-center gap-4 py-2.5 ${!isLast ? 'border-b border-gray-50' : ''}`}
    >
        <span className="material-symbols-outlined text-[16px] text-primary">
            scale
        </span>
        <span className="w-28 shrink-0 text-xs text-gray-400">
            {fmt(record.weight_date)}
        </span>
        <span className="text-sm font-bold text-gray-800">
            {parseFloat(record.weight).toFixed(1)} kg
        </span>
        {record.body_condition_score && (
            <span className="rounded bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700">
                BCS {record.body_condition_score}
            </span>
        )}
        {record.room_temperature && (
            <span className="ml-auto text-xs text-gray-400">
                {parseFloat(record.room_temperature).toFixed(1)} °C
            </span>
        )}
    </div>
);


export default WeightRow
