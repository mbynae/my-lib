import { SvgProps } from '../icon-type';

const SearchIcon = ({ color = '#666666' }: SvgProps) => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1802_136)">
                <path
                    d="M7.07903 13.1671C8.28288 13.1683 9.46008 12.8127 10.462 12.1453C11.464 11.4779 12.2457 10.5286 12.7085 9.4173C13.1711 8.30582 13.2931 7.08197 13.0591 5.90103C12.8251 4.72009 12.2456 3.63527 11.3941 2.78421C10.5431 1.9328 9.45878 1.35279 8.27825 1.11747C7.09771 0.882143 5.87391 1.00208 4.76151 1.46211C3.64912 1.92214 2.69806 2.70162 2.02854 3.70203C1.35903 4.70244 1.0011 5.87888 1 7.08267C1 8.69534 1.64022 10.2414 2.77989 11.3819C3.91993 12.5224 5.46567 13.1644 7.07827 13.1671M11.3963 11.3985L15 15"
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_1802_136">
                    <rect width="16" height="16" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default SearchIcon;
