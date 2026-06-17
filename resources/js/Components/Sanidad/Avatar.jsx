const Avatar = ({ animal, size = 'md' }) => {
    function getImageUrl(animal) {
        return animal.media?.[0]?.original_url ?? null;
    }

    function getInitials(animal) {
        return String(animal.ear_tag ?? '??')
            .slice(0, 2)
            .toUpperCase();
    }

    const img = getImageUrl(animal);
    const sizes = {
        sm: 'h-7 w-7 text-[11px]',
        md: 'h-9 w-9 text-sm',
        lg: 'h-11 w-11 text-base',
    };
    return img ? (
        <img
            src={img}
            alt={String(animal.ear_tag)}
            className={`${sizes[size]} rounded-full object-cover ring-2 ring-white`}
        />
    ) : (
        <div
            className={`${sizes[size]} flex shrink-0 items-center justify-center rounded-full bg-green-100 font-semibold text-green-700 ring-2 ring-white`}
        >
            {getInitials(animal)}
        </div>
    );
};

export default Avatar;
