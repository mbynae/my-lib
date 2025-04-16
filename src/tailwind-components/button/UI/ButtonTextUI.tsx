import type { ButtonProps } from '../button-type';

export default function ButtonTextUI({ children, className }: ButtonProps<'text'>) {
    return (
        <button type="button" className={`btn-text ${className}`}>
            {children}
        </button>
    );
}
