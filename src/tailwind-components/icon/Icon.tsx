import { classNames } from '../../function/className';

import * as Icons from './svg';
import type { IconProps } from './icon-type';

export default function Icon({ icon, className, width, height, style, ...props }: IconProps) {
    const css = { width: width, height: height, ...style };

    // 아이콘 컴포넌트 찾기
    const name = icon.charAt(0).toUpperCase() + icon.slice(1);
    const Component = Icons[name as keyof typeof Icons];

    return (
        <div {...props} className={classNames('flex items-center justify-center', className)} style={css} role="img">
            {/* 이름이 매칭되는 컴포넌트 넣기 */}
            {Component && <Component {...props} />}
        </div>
    );
}
