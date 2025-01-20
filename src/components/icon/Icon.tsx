import { useMemo } from 'react';
import { iconAlt, IconProps } from './icon-type';

import * as Icons from './svg';
import styles from './Icon.module.css';

export default function Icon({ icon, className, alt, color, width, height, style, ...props }: IconProps) {
    const iconStyle = useMemo(() => [styles.icon, className].join(' '), [className]);
    const css = { width: width, height: height, ...style };

    // 아이콘 컴포넌트 찾기
    const name = icon.charAt(0).toUpperCase() + icon.slice(1);
    const IconComponent = Icons[name as keyof typeof Icons];

    return (
        <div aria-label={alt ?? iconAlt[icon]} {...props} className={iconStyle} style={css} role="img">
            {/* 이름이 매칭되는 컴포넌트 넣기 */}
            {IconComponent && <IconComponent color={color} />}
        </div>
    );
}
