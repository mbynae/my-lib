import { SvgProps } from '../icon-type';

const LockerIcon = ({ color = '#666666', strokeWidth = 1 }: SvgProps) => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.7202 2L2.00019 2" stroke={color} strokeLinecap="round" strokeWidth={strokeWidth} />
            <path d="M21.7202 2L2.00019 2" stroke={color} strokeLinecap="round" strokeWidth={strokeWidth} />
            <path d="M21.7202 19.2559L2.00019 19.2559" stroke={color} strokeLinecap="round" strokeWidth={strokeWidth} />
            <path d="M18.4336 9.39453L15.1469 9.39453" stroke={color} strokeLinecap="round" strokeWidth={strokeWidth} />
            <path d="M18.4336 6.10938L15.1469 6.10938" stroke={color} strokeLinecap="round" strokeWidth={strokeWidth} />
            <path d="M18.4336 9.39453L15.1469 9.39453" stroke={color} strokeLinecap="round" strokeWidth={strokeWidth} />
            <path d="M8.57324 9.39453L5.28657 9.39453" stroke={color} strokeLinecap="round" strokeWidth={strokeWidth} />
            <path d="M18.4336 6.10938L15.1469 6.10938" stroke={color} strokeLinecap="round" strokeWidth={strokeWidth} />
            <path d="M8.57324 6.10938L5.28657 6.10938" stroke={color} strokeLinecap="round" strokeWidth={strokeWidth} />
            <path
                d="M21.2202 22.541C21.2202 22.8172 21.4441 23.041 21.7202 23.041C21.9964 23.041 22.2202 22.8172 22.2202 22.541L21.2202 22.541ZM22.2202 2.82099L22.2202 2.32099L21.2202 2.32099L21.2202 2.82099L22.2202 2.82099ZM22.2202 22.541L22.2202 2.82099L21.2202 2.82099L21.2202 22.541L22.2202 22.541Z"
                fill={color}
            />
            <path
                d="M11.3599 22.541C11.3599 22.8172 11.5837 23.041 11.8599 23.041C12.136 23.041 12.3599 22.8172 12.3599 22.541L11.3599 22.541ZM12.3599 2.82099L12.3599 2.32099L11.3599 2.32099L11.3599 2.82099L12.3599 2.82099ZM12.3599 22.541L12.3599 2.82099L11.3599 2.82099L11.3599 22.541L12.3599 22.541Z"
                fill={color}
            />
            <path
                d="M1.5 22.541C1.5 22.8172 1.72386 23.041 2 23.041C2.27614 23.041 2.5 22.8172 2.5 22.541L1.5 22.541ZM2.5 2.82099L2.5 2.32099L1.5 2.32099L1.5 2.82099L2.5 2.82099ZM2.5 22.541L2.5 2.82099L1.5 2.82099L1.5 22.541L2.5 22.541Z"
                fill={color}
            />
        </svg>
    );
};

export default LockerIcon;
