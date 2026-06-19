import { useForm } from '@inertiajs/react';

const ModalFormUsuario = ({ usuario = null, roles, onClose }) => {
    const isEdit = !!usuario;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: usuario?.name ?? '',
        email: usuario?.email ?? '',
        password: '',
        role: usuario?.roles?.[0]?.name ?? '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        const options = {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        };

        if (isEdit) {
            put(route('users.update', usuario.id), options);
        } else {
            post(route('users.store'), options);
        }
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-primary">
                        {isEdit ? 'manage_accounts' : 'person_add'}
                    </span>
                    <h2 className="text-base font-bold text-gray-800">
                        {isEdit ? 'Editar usuario' : 'Nuevo usuario'}
                    </h2>
                </div>
                <button
                    onClick={onClose}
                    className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                    <span className="material-symbols-outlined text-[20px]">
                        close
                    </span>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nombre */}
                <FormField
                    label="Nombre completo"
                    icon="person"
                    error={errors.name}
                >
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Ej. Juan Pérez"
                        className={`field-input w-full rounded-xl border px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                    />
                </FormField>

                {/* Email */}
                <FormField
                    label="Correo electrónico"
                    icon="email"
                    error={errors.email}
                >
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="juan@ejemplo.com"
                        className={`field-input w-full rounded-xl border px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                    />
                </FormField>

                {/* Contraseña */}
                <FormField
                    label={
                        isEdit ? 'Nueva contraseña (opcional)' : 'Contraseña'
                    }
                    icon="lock"
                    error={errors.password}
                >
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder={
                            isEdit
                                ? 'Dejar en blanco para no cambiar'
                                : 'Mínimo 8 caracteres'
                        }
                        className={`field-input w-full rounded-xl border px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary ${errors.password ? 'border-red-400' : 'border-gray-200'}`}
                    />
                </FormField>

                {/* Rol */}
                <FormField label="Rol" icon="shield_person" error={errors.role}>
                    <select
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                        className={`field-input w-full rounded-xl border px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary ${errors.role ? 'border-red-400' : 'border-gray-200'}`}
                    >
                        <option value="">Sin rol</option>
                        {roles.map((r) => (
                            <option key={r.id} value={r.name}>
                                {r.name}
                            </option>
                        ))}
                    </select>
                </FormField>

                {/* Acciones */}
                <div className="flex justify-end gap-2 pt-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl px-4 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
                    >
                        {processing && (
                            <span className="material-symbols-outlined animate-spin text-[16px]">
                                progress_activity
                            </span>
                        )}
                        {isEdit ? 'Guardar cambios' : 'Crear usuario'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const FormField = ({ label, icon, error, children }) => (
    <div>
        <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
            <span className="material-symbols-outlined text-[13px] text-primary">
                {icon}
            </span>
            {label}
        </label>
        {children}
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
);

export default ModalFormUsuario;
