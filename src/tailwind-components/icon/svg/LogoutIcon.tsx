import { SvgProps } from '../icon-type';

const LogoutIcon = ({ color = '#0F2B71' }: SvgProps) => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M11.875 6.25V4.375C11.875 3.87772 11.6775 3.40081 11.3258 3.04917C10.9742 2.69754 10.4973 2.5 10 2.5H3.4375C2.94022 2.5 2.46331 2.69754 2.11167 3.04917C1.76004 3.40081 1.5625 3.87772 1.5625 4.375V15.625C1.5625 16.1223 1.76004 16.5992 2.11167 16.9508C2.46331 17.3025 2.94022 17.5 3.4375 17.5H10C10.4973 17.5 10.9742 17.3025 11.3258 16.9508C11.6775 16.5992 11.875 16.1223 11.875 15.625V13.75"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.1875 10H18.4375M18.4375 10L15.625 7.1875M18.4375 10L15.625 12.8125"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default LogoutIcon;
