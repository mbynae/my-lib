import type { ButtonProps } from '../button-type';
import '../button.tailwind.css';

export default function ButtonBoxUI({ children, className, ...props }: ButtonProps<'default'>) {
    return (
        <button {...props} className={`btn-box ${className}`}>
            {children}
        </button>
    );
}
