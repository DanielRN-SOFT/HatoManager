const TitulosTabs = ({ tabs, setActiveTab, activeTab }) => {
    return (
        <div className="flex gap-1 overflow-x-auto rounded-2xl bg-surface-container p-1">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`shrink-0 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                        activeTab === tab.key
                            ? 'bg-surface text-primary shadow-sm'
                            : 'text-on-surface-variant hover:bg-surface/50 hover:text-on-surface'
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default TitulosTabs;
