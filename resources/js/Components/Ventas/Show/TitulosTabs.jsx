const TitulosTabs = ({tabs, setActiveTab, activeTab}) => {
    return (
        <div className="flex gap-6 overflow-x-auto border-b border-outline-variant">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`shrink-0 whitespace-nowrap border-b-2 px-1 pb-3 text-sm font-bold transition-colors ${
                        activeTab === tab.key
                            ? 'border-primary text-primary'
                            : 'border-transparent text-on-surface-variant hover:text-on-surface'
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default TitulosTabs;
