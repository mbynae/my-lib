import { SvgProps } from "../icon-type"

const RefreshIcon = ({ color = '#666666' }: SvgProps) => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.9483 4.74964C12.2993 4.19154 11.5281 3.74892 10.6789 3.44722C9.82967 3.14553 8.91926 2.99071 8 2.99168C6.14356 2.99188 4.36321 3.62413 3.05051 4.74937C1.73781 5.87462 1.00023 7.40072 1 8.99206C1.00023 10.5841 1.73752 12.111 3.04997 13.2374C4.36242 14.3639 6.14274 14.9978 8 15C9.85741 14.9978 11.6379 14.3638 12.9503 13.2372C14.2628 12.1105 15 10.5835 15 8.9913" stroke={color} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
            <path d="M12.3083 1L13.147 3.91959C13.2214 4.17839 13.1731 4.45192 13.0125 4.68019C12.852 4.90846 12.5924 5.07283 12.2906 5.13722L8.87493 5.85464" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default RefreshIcon
