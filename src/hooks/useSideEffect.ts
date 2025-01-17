import { useEffect } from 'react';

//외부 클릭 시 드롭다운 창 off
type CloseDropdownType = <T extends HTMLElement>(a: boolean, ref: React.RefObject<T>, fn: () => void) => void;
export const useCloseDropdown: CloseDropdownType = (active, ref, fn) => {
    useEffect(() => {
        const closeDropdown: EventListenerOrEventListenerObject = e => {
            if (ref.current && !ref.current?.contains(e.target as Node)) fn();
        }; // 요소 외부 클릭 시 드롭 다운 실행 함수

        if (active) document.addEventListener('click', closeDropdown);

        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, [active]);
};
