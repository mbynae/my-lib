import styles from '../button.module.css';

import type { ButtonProps } from '../button-type';

export default function ButtonTextUI({ children }: ButtonProps) {
    return <button>{children}</button>;
}
