import InputError from '@/Components/Auth/InputError';
import InputLabel from '@/Components/Auth/InputLabel';
import PrimaryButton from '@/Components/Auth/PrimaryButton';
import TextInput from '@/Components/Auth/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { PiCowFill } from 'react-icons/pi';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            {/* Section header */}
            <div className="mb-5 flex items-center gap-3 border-b border-outline-variant pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container">
                    <span className="material-symbols-outlined text-[20px] text-on-primary">
                        manage_accounts
                    </span>
                </div>
                <div>
                    <h2 className="text-base font-semibold text-on-surface">
                        Información del Perfil
                    </h2>
                    <p className="text-xs text-on-surface-variant">
                        Actualiza tu nombre y correo electrónico
                    </p>
                </div>
            </div>

            {/* Avatar card */}
            <div className="mb-6 flex items-center gap-4 rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-on-primary ring-2 ring-primary-fixed">
                    {user.name?.slice(0, 2).toUpperCase()}
                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-surface bg-green-500" />
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-on-surface">
                        {user.name}
                    </p>
                    <p className="truncate text-xs text-on-surface-variant">
                        {user.email}
                    </p>
                    {user.roles?.[0]?.name && (
                        <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-primary-container px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-on-primary">
                            <PiCowFill className="text-[11px]" />
                            {user.roles[0].name}
                        </span>
                    )}
                </div>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="name" value="Nombre completo" />
                    <TextInput
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Correo electrónico" />
                    <TextInput
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="rounded-lg border border-outline-variant bg-surface-container-low p-3">
                        <p className="text-sm text-on-surface-variant">
                            Tu correo no está verificado.{' '}
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="font-medium text-primary underline hover:text-primary/80"
                            >
                                Reenviar verificación
                            </Link>
                        </p>
                        {status === 'verification-link-sent' && (
                            <p className="mt-2 text-sm font-medium text-green-600">
                                Enlace de verificación enviado.
                            </p>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4 border-t border-outline-variant pt-4">
                    <PrimaryButton disabled={processing}>
                        Guardar cambios
                    </PrimaryButton>
                    <Transition show={recentlySuccessful}>
                        <p className="flex items-center gap-1 text-sm font-medium text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                                check_circle
                            </span>
                            Guardado
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
