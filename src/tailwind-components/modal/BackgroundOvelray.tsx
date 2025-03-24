import { useEffect, useRef } from 'react';
import './UI/modal-tailwind.css';

import type { BackgroundOverayProps } from './modal-type';

type MouseEvent = (e: React.MouseEvent<HTMLElement>) => void;
const BackgroundOverlay = ({ children, isShowBg = true, bgClickActive = true, onClose, name }: BackgroundOverayProps) => {
    const bg = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isShowBg) {
            bg.current?.previousElementSibling?.classList.remove('modal-backgroundOveray');
            document.getElementById('body')!.style.overflow = 'hidden';
        }

        return () => {
            document.getElementById('modal')!.lastElementChild?.classList.add('modal-backgroundOveray');
            document.getElementById('body')!.style.overflow = 'auto';
        };
    }, [isShowBg]);

    return (
        <div
            className="modal-backgroundOveray"
            onClick={isShowBg && bgClickActive ? (onClose as MouseEvent) : () => {}}
            data-name={name}
            ref={bg}
        >
            {children}
        </div>
    );
};

export default BackgroundOverlay;
