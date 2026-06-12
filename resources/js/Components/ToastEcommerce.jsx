import React from 'react'

const ToastEcommerce = ({toast}) => {
  return (
      <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg transition-all duration-300 ${
              toast.type === 'error'
                  ? 'bg-error text-on-error'
                  : 'bg-primary text-on-primary'
          }`}
      >
          <span className="material-symbols-outlined text-[20px]">
              {toast.type === 'error' ? 'error' : 'check_circle'}
          </span>
          <span className="text-sm font-medium">{toast.message}</span>
      </div>
  );
}

export default ToastEcommerce
