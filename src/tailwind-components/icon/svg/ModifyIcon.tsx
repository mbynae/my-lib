import { SvgProps } from '../icon-type';

const ModifyIcon = ({ color = '#666666', strokeWidth = 1 }: SvgProps) => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16.9103 4.4744L19.5254 7.08955M18.5915 2.17056L11.5169 9.24516C11.1503 9.60938 10.9008 10.0748 10.8005 10.5818L10.147 13.8529L13.4181 13.1981C13.9245 13.0968 14.389 12.8485 14.7547 12.4829L21.8293 5.4083C22.0419 5.1957 22.2105 4.94332 22.3256 4.66555C22.4406 4.38779 22.4998 4.09008 22.4998 3.78943C22.4998 3.48878 22.4406 3.19107 22.3256 2.9133C22.2105 2.63554 22.0419 2.38315 21.8293 2.17056C21.6167 1.95796 21.3643 1.78933 21.0865 1.67427C20.8088 1.55922 20.5111 1.5 20.2104 1.5C19.9097 1.5 19.612 1.55922 19.3343 1.67427C19.0565 1.78933 18.8041 1.95796 18.5915 2.17056Z"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
            <path
                d="M20.0296 16.3238V20.0297C20.0296 20.6849 19.7693 21.3133 19.306 21.7767C18.8426 22.24 18.2142 22.5003 17.559 22.5003H3.97061C3.31537 22.5003 2.68696 22.24 2.22363 21.7767C1.7603 21.3133 1.5 20.6849 1.5 20.0297V6.44132C1.5 5.78607 1.7603 5.15766 2.22363 4.69433C2.68696 4.231 3.31537 3.9707 3.97061 3.9707H7.67653"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={strokeWidth}
            />
        </svg>
    );
};

export default ModifyIcon;
