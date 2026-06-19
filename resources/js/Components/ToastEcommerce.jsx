const ToastEcommerce = ({ toast }) => {
    return (
        <div
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl px-5 py-3.5 shadow-xl transition-all duration-300 ${
                toast.type === 'error'
                    ? 'bg-error text-on-error'
                    : 'bg-primary text-on-primary'
            }`}
        >
            <span className="material-symbols-outlined text-[20px]">
                {toast.type === 'error' ? 'error' : 'check_circle'}
            </span>
            <span className="text-sm font-semibold">{toast.message}</span>
        </div>
    );
};

export default ToastEcommerce;
