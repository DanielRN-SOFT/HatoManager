import { useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function InviteForm({ farm }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
    });
    const [open, setOpen] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    function submit(e) {
        e.preventDefault();
        post(route('veterinarians.invite', farm.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset('email');
                setOpen(false);
            },
        });
    }

    return (
        <div className="mt-4">
            {!open ? (
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 rounded-lg border border-dashed border-outline-variant px-4 py-2.5 text-sm text-on-surface-variant transition-colors hover:border-primary hover:text-primary"
                >
                    <span className="material-symbols-outlined text-[18px]">
                        person_add
                    </span>
                    Invitar veterinario
                </button>
            ) : (
                <form
                    onSubmit={submit}
                    className="rounded-xl border border-outline-variant bg-surface-container-low p-4"
                >
                    <p className="mb-3 text-sm font-medium text-on-surface">
                        Invitar veterinario a{' '}
                        <span className="text-primary">{farm.name}</span>
                    </p>

                    <div className="flex gap-2">
                        <div className="flex-1">
                            <input
                                ref={inputRef}
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                placeholder="correo@veterinario.com"
                                className={[
                                    'w-full rounded-lg border bg-surface px-3 py-2 text-sm text-on-surface',
                                    'placeholder:text-on-surface-variant/60',
                                    'focus:outline-none focus:ring-2 focus:ring-primary/30',
                                    errors.email
                                        ? 'border-error focus:ring-error/20'
                                        : 'border-outline-variant',
                                ].join(' ')}
                                required
                            />
                            {errors.email && (
                                <p className="mt-1 text-xs text-error">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-on-primary transition-opacity disabled:opacity-60"
                        >
                            <span className="material-symbols-outlined text-[16px]">
                                send
                            </span>
                            {processing ? 'Enviando…' : 'Enviar'}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setOpen(false);
                                reset('email');
                            }}
                            className="rounded-lg border border-outline-variant px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-container"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                close
                            </span>
                        </button>
                    </div>

                    <p className="mt-2 flex items-center gap-1.5 text-xs text-on-surface-variant">
                        <span className="material-symbols-outlined text-[14px]">
                            info
                        </span>
                        Si el correo no tiene cuenta, recibirá un enlace de
                        registro válido por 48 horas.
                    </p>
                </form>
            )}
        </div>
    );
}
