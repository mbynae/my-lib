import { SvgProps } from '../icon-type';

const ArrowIcon = ({ color = '#000' }: SvgProps) => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1789_43)">
                <path d="M2.66667 9.08366L6.75 5.00033L2.66667 0.916992" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
            </g>
            <defs>
                <clipPath id="clip0_1789_43">
                    <rect width="10" height="10" fill="white" transform="translate(0 10) rotate(-90)" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default ArrowIcon;
