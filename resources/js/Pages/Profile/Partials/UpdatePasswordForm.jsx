import InputError from '@/Components/Auth/InputError';
import InputLabel from '@/Components/Auth/InputLabel';
import PrimaryButton from '@/Components/Auth/PrimaryButton';
import TextInput from '@/Components/Auth/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            {/* Section header */}
            <div className="mb-5 flex items-center gap-3 border-b border-outline-variant pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container">
                    <span className="material-symbols-outlined text-[20px] text-on-primary">
                        lock
                    </span>
                </div>
                <div>
                    <h2 className="text-base font-semibold text-on-surface">
                        Seguridad
                    </h2>
                    <p className="text-xs text-on-surface-variant">
                        Usa una contraseña larga y segura
                    </p>
                </div>
            </div>

            {/* Password strength hint */}
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-outline-variant bg-surface-container-low px-4 py-3">
                <span className="material-symbols-outlined mt-0.5 shrink-0 text-[18px] text-on-surface-variant">
                    info
                </span>
                <p className="text-xs leading-relaxed text-on-surface-variant">
                    Recomendamos una contraseña de al menos 8 caracteres con
                    letras, números y símbolos, mayusculas y minusculas para
                    proteger tu cuenta ganadera.
                </p>
            </div>

            <form onSubmit={updatePassword} className="space-y-5">
                <div>
                    <InputLabel
                        htmlFor="current_password"
                        value="Contraseña actual"
                    />
                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        type="password"
                        autoComplete="current-password"
                        placeholder="Ingrese su contraseña actual"
                    />
                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Nueva contraseña" />
                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        autoComplete="new-password"
                        placeholder="Ingrese su nueva contraseña"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirmar nueva contraseña"
                    />
                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        type="password"
                        autoComplete="new-password"
                        placeholder="Confirme su nueva contraseña"
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center gap-4 border-t border-outline-variant pt-4">
                    <PrimaryButton disabled={processing}>
                        Actualizar contraseña
                    </PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="flex items-center gap-1 text-sm font-medium text-primary">
                            <span className="material-symbols-outlined text-[16px]">
                                check_circle
                            </span>
                            Actualizado
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
