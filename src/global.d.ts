import { react } from 'react';

declare module 'react' {
    interface CSSProperties {
        [key: `--${string}`]: string | number;

        anchorName?: string;
        positionAnchor?: string;
    }

    interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
        closedby?: 'none' | 'closerequest' | 'any';
    }
}
