const InfoItem = ({ label, value, highlight }) => {
    return (
        <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                {label}
            </p>
            <p
                className={`mt-0.5 text-sm ${highlight ? 'font-bold text-secondary' : 'text-gray-800'}`}
            >
                {value}
            </p>
        </div>
    );
}

export default InfoItem;
