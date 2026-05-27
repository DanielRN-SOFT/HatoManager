import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput(
    {
        type = 'text',
        className = '',
        isFocused = false,
        hasError = false,
        ...props
    },
    ref,
) {
    const innerRef = useRef();
    const input = ref ?? innerRef;

    useEffect(() => {
        if (isFocused) input.current.focus();
    }, []);

    return (
        <input
            {...props}
            type={type}
            ref={input}
            className={
                'w-full rounded-lg border bg-white px-4 py-3 text-sm text-on-surface placeholder-on-surface-variant/40 outline-none transition-all ' +
                (hasError
                    ? 'border-error focus:border-error focus:ring-2 focus:ring-error/30'
                    : 'border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20') +
                className
            }
        />
    );
});
