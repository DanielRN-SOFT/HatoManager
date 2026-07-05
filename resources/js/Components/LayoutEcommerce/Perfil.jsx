import Dropdown from '@/Components/Dropdown';
import { useRole } from '@/hooks/useRole';

const Perfil = ({ getInitials, user, isGanadero }) => {
    const { isComprador, isVeterinario } = useRole();

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <button
                    className="group flex items-center gap-2.5 rounded-lg border-l border-outline-variant px-2 py-1.5 pl-4 transition-colors duration-150 hover:bg-surface-container"
                    aria-label="Menú de usuario"
                >
                    <div className="hidden text-right sm:block">
                        <p className="text-sm font-semibold leading-none text-on-surface">
                            {user.name}
                        </p>
                        <p className="mt-0.5 text-xs text-on-surface-variant">
                            {user.email}
                        </p>
                    </div>

                    <div
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary ring-2 ring-transparent transition-all group-hover:opacity-90"
                        aria-hidden="true"
                    >
                        {getInitials(user.name)}
                    </div>

                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant transition-transform duration-300">
                        expand_more
                    </span>
                </button>
            </Dropdown.Trigger>

            <Dropdown.Content contentClasses="py-1 bg-surface border border-outline-variant">
                {/* User info header */}
                <div className="flex items-center gap-3 border-b border-outline-variant px-4 py-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary">
                        {getInitials(user.name)}
                    </div>
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-on-surface">
                            {user.name}
                        </p>
                        <p className="truncate text-xs text-on-surface-variant">
                            {user.email}
                        </p>
                    </div>
                </div>

                {/* Links */}
                <div className="py-1">
                    {isGanadero && (
                        <Dropdown.Link
                            href="/dashboard"
                            className="flex items-center gap-2.5"
                        >
                            <span className="material-symbols-outlined text-[17px] text-on-surface-variant">
                                dashboard
                            </span>
                            Dashboard
                        </Dropdown.Link>
                    )}

                    {isVeterinario && (
                        <Dropdown.Link
                            href="/animals"
                            className="flex items-center gap-2.5"
                        >
                            <span className="material-symbols-outlined text-[17px] text-on-surface-variant">
                                pets
                            </span>
                            Animales
                        </Dropdown.Link>
                    )}

                    {isComprador && (
                        <Dropdown.Link
                            href="/public/profile"
                            className="flex items-center gap-2.5"
                        >
                            <span className="material-symbols-outlined text-[17px] text-on-surface-variant">
                                person
                            </span>
                            Ver perfil
                        </Dropdown.Link>
                    )}
                    <Dropdown.Link
                        href="/my-orders"
                        className="flex items-center gap-2.5"
                    >
                        <span className="material-symbols-outlined text-[17px] text-on-surface-variant">
                            receipt_long
                        </span>
                        Historial de mis pedidos
                    </Dropdown.Link>
                </div>

                <div className="border-t border-outline-variant py-1">
                    <Dropdown.Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="flex w-full items-center gap-2.5 text-red-500 hover:bg-red-50 hover:text-red-600"
                    >
                        <span className="material-symbols-outlined text-[17px]">
                            logout
                        </span>
                        Cerrar sesión
                    </Dropdown.Link>
                </div>
            </Dropdown.Content>
        </Dropdown>
    );
};

export default Perfil;
