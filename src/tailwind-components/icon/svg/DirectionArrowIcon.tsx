import { SvgProps } from '../icon-type';

const DirectionArrowIcon = ({ color = '#000', strokeWidth = 3 }: SvgProps) => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1.66667 18.5L35 18.5M35 18.5L22.5 31M35 18.5L22.5 6"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default DirectionArrowIcon;
