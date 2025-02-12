import type { ButtonProps } from '../button-type';

export default function ButtonTextUI({ children, className }: ButtonProps<'text'>) {
    return <button className={`btn-text ${className}`}>{children}</button>;
}
