const EmptyChart = ({ h = 220, text = 'Sin datos aún' }) => (
    <div
        className={`flex flex-col items-center justify-center gap-2 text-gray-300`}
        style={{ height: h }}
    >
        <span className="material-symbols-outlined text-4xl">bar_chart</span>
        <p className="text-xs">{text}</p>
    </div>
);

export default EmptyChart;
