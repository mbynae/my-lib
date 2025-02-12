import { SvgProps } from '../icon-type';

const NoticeIcon = ({ color = '#666666' }: SvgProps) => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12.8302 14.629H7.16774M12.8302 14.629H16.2182C17.9769 14.629 17.6798 12.9068 16.7901 12.0327C13.5858 8.88916 18.1373 1.66602 9.99895 1.66602C1.86064 1.66602 6.41307 8.88824 3.20875 12.0327C2.35282 12.8734 1.98814 14.629 3.78061 14.629H7.16774M12.8302 14.629C12.8302 16.4114 12.2227 18.3327 9.99895 18.3327C7.77523 18.3327 7.16774 16.4114 7.16774 14.629"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default NoticeIcon;
