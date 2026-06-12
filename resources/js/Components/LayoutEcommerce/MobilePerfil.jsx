import { Link } from "@inertiajs/react";

const MobilePerfil = ({getInitials, user, setMenuOpen, esGanadero}) => {
  return (
      <div className="mt-4 flex flex-col gap-1 border-t border-outline-variant pt-4">
          {/* User info */}
          <div className="flex items-center gap-3 px-3 py-2">
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

          <Link
              href="/perfil"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-on-surface-variant no-underline transition-colors hover:bg-surface-container hover:text-primary"
          >
              <span className="material-symbols-outlined text-[18px]">
                  person
              </span>
              Ver perfil
          </Link>
          <Link
              href="/historial-ventas"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-on-surface-variant no-underline transition-colors hover:bg-surface-container hover:text-primary"
          >
              <span className="material-symbols-outlined text-[18px]">
                  receipt_long
              </span>
              Historial de ventas
          </Link>
          {esGanadero && (
              <Link
                  href="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-on-surface-variant no-underline transition-colors hover:bg-surface-container hover:text-primary"
              >
                  <span className="material-symbols-outlined text-[18px]">
                      dashboard
                  </span>
                  Dashboard
              </Link>
          )}

          <div className="mt-1 border-t border-outline-variant pt-1">
              <Link
                  href="/logout"
                  method="post"
                  as="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
              >
                  <span className="material-symbols-outlined text-[18px]">
                      logout
                  </span>
                  Cerrar sesión
              </Link>
          </div>
      </div>
  );
}

export default MobilePerfil
