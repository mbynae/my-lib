export function classNames(...className: (string | undefined)[]) {
    return [...className].filter(Boolean).join(' ');
}
