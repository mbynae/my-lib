import type { ButtonProps } from '../button-type';
import '../button.tailwind.css';

export default function ButtonOutlineUI({ children, className, ...props }: ButtonProps<'outline'>) {
    return (
        <button {...props} className={`btn-outline ${className}`}>
            {children}
        </button>
    );
}
