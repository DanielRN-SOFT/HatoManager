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
                'w-full rounded-lg border bg-white px-4 py-2 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all ' +
                (hasError
                    ? 'border-error focus:border-red-400 focus:ring-2 focus:ring-error/20'
                    : 'border-gray-200 focus:border-primary focus:ring-2 focus:ring-secondary/20') +
                ' ' +
                className
            }
        />
    );
});
