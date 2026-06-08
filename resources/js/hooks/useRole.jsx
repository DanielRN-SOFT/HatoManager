import { usePage } from '@inertiajs/react';

export function useRole() {
    const { auth } = usePage().props;
    const roles = auth.roles ?? [];
    const permissions = auth.permissions ?? [];

    return {
        roles,
        permissions,
        isGanadero: roles.includes('ganadero'),
        isVeterinario: roles.includes('veterinario'),
        isComprador: roles.includes('comprador'),
        is: (...check) => check.some((r) => roles.includes(r)),
        can: (permission) => permissions.includes(permission),
        canAny: (...perms) => perms.some((p) => permissions.includes(p)),
    };
}
