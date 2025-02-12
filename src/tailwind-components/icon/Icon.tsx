import { useMemo } from 'react';
import { IconProps } from './icon-type';

import * as Icons from './svg';
import styles from './Icon.module.css';

export default function Icon({ icon, className, width, height, style, ...props }: IconProps) {
    const iconStyle = useMemo(() => [styles.icon, className].join(' '), [className]);
    const css = { width: width, height: height, ...style };

    // 아이콘 컴포넌트 찾기
    const name = icon.charAt(0).toUpperCase() + icon.slice(1);
    const Component = Icons[name as keyof typeof Icons];

    return (
        <div {...props} className={iconStyle} style={css} role="img">
            {/* 이름이 매칭되는 컴포넌트 넣기 */}
            {Component && <Component {...props} />}
        </div>
    );
}
