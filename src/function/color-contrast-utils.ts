// RGB 값을 기반으로 상대 휘도(Relative luminance)를 계산하는 함수
export function getLuminance(r: number, g: number, b: number) {
    // sRGB 색 공간에서의 상대 휘도 계산
    const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// 16진수 색상 코드를 RGB 값으로 변환하는 함수
export function hexToRgb(hex: string) {
    // #을 제거하고 처리
    hex = hex.replace('#', '');

    // 3자리 hex 코드를 6자리로 변환 (#fff -> #ffffff)
    if (hex.length === 3) {
        hex = hex
            .split('')
            .map(char => char + char)
            .join('');
    }

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
}

// 배경색을 기반으로 적절한 텍스트 색상을 반환하는 함수
export function getContrastColor<T extends string>(backgroundColor: T, darkColor: string = '#000', lightColor: string = '#fff') {
    // RGB 값 추출
    const [r, g, b] = hexToRgb(backgroundColor);

    // 휘도 계산
    const luminance = getLuminance(r, g, b);

    // WCAG 기준: 휘도가 0.5보다 크면 어두운 텍스트, 작으면 밝은 텍스트
    return luminance > 0.5 ? darkColor : lightColor;
}
