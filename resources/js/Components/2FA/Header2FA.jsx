const Header2FA = () => {
  return (
      <div className="mb-5 flex items-center gap-3 border-b border-outline-variant pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-container">
              <span className="material-symbols-outlined text-[20px] text-on-primary">
                  verified_user
              </span>
          </div>
          <div>
              <h2 className="text-base font-semibold text-on-surface">
                  Verificación en dos pasos
              </h2>
              <p className="text-xs text-on-surface-variant">
                  Protege tu cuenta con autenticación 2FA
              </p>
          </div>
      </div>
  );
}

export default Header2FA
