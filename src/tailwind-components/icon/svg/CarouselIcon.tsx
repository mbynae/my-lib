import { SvgProps } from '../icon-type';

const CarouselIcon = ({ color = '#000' }: SvgProps) => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 16V18H4V16H0V4H4V2H16V4H20V16H16ZM14 5.5V4H6V16H14V5.5ZM16 6V14H18V6H16ZM4 6H2V14H4V6Z" fill={color} />
        </svg>
    );
};

export default CarouselIcon;
