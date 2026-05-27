import UserDropdown from './UserDropDown';

const TopNavBar = ({ user, onMenuOpen, sidebarWidth }) => {
    return (
        <header
            className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-outline-variant bg-surface px-4 sm:px-6"
            style={{ paddingLeft: sidebarWidth }}
        >
            {/* Mobile hamburger */}
            <button
                onClick={onMenuOpen}
                className="rounded-lg p-2 text-on-surface-variant transition-colors hover:bg-surface-container lg:hidden"
            >
                <span className="material-symbols-outlined">menu</span>
            </button>

            {/* Farm name selector */}
            <button className="group hidden items-center gap-1.5 rounded-lg px-2 py-1 transition-colors hover:bg-surface-container lg:flex">
                <h2 className="text-base font-semibold text-on-surface">
                    Finca La Esperanza
                </h2>
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant transition-transform duration-200 group-hover:translate-y-0.5">
                    expand_more
                </span>
            </button>

            {/* Search */}
            <div className="mx-4 hidden max-w-sm flex-1 sm:block">
                <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-[18px] text-on-surface-variant">
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="Buscar animal, arete o lote…"
                        className="w-full rounded-full border border-transparent bg-surface-container-low py-2 pl-9 pr-4 text-sm transition-all duration-200 placeholder:text-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
                {/* Notifications */}
                <button className="relative rounded-full p-2 text-on-surface-variant transition-colors duration-150 hover:bg-surface-container">
                    <span className="material-symbols-outlined">
                        notifications
                    </span>
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-surface bg-error" />
                </button>

                <UserDropdown user={user} />
            </div>
        </header>
    );
};

export default TopNavBar;
