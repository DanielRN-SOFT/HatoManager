import InputError from '@/Components/Auth/InputError';
import InputLabel from '@/Components/Auth/InputLabel';
import PrimaryButton from '@/Components/Auth/PrimaryButton';
import TextInput from '@/Components/Auth/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

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
        // Dentro del return, reemplaza <section> con:
        <section className={className}>
            <div className="mb-5 flex items-center gap-3 border-b border-outline-variant pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container text-lg">
                    👤
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

            {/* Avatar preview */}
            <div className="mb-5 flex items-center gap-3 rounded-xl border border-outline-variant bg-surface px-4 py-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-on-primary">
                    {user.name?.slice(0, 2).toUpperCase()}
                </div>
                <div>
                    <p className="text-sm font-semibold text-on-surface">
                        {user.name}
                    </p>
                    <p className="text-xs text-on-surface-variant">
                        {user.email}
                    </p>
                </div>
            </div>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                {/* ...el resto del form igual, solo cambia los botones y wrapper: */}
                <div className="flex items-center gap-4 border-t border-outline-variant pt-4">
                    <PrimaryButton disabled={processing}>
                        Guardar cambios
                    </PrimaryButton>
                    <Transition show={recentlySuccessful}>
                        <p className="text-sm font-medium text-primary">
                            ✓ Guardado
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
