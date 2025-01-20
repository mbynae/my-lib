export const CSS_VARIABLES = {
    '--main-color': '#589cec',
    '--main-color-hover': 'hsl(212, 80%, 69%)',
    '--main-color-thin': 'rgba(88, 156, 236, 0.15)',

    '--font-color': '#000',
    '--font-color-white': '#fff',

    '--disabled-color': '#cdcdcd',
    '--disabled-color-bg': '#f5f5f5',

    '--ddd-color-tes': '#dddddd',
} as const;

export const CSS_PROPERTY = {
    mainColor: '--main-color',
    mainColorHover: '--main-color-hover',
    mainColorThin: '--main-color-thin',

    fontColor: '--font-color',
    fontColorWhite: '--font-color-white',

    disabledColor: '--disabled-color',
    disabledColorBg: '--disabled-color-bg',
} as const;

export const cssProperty = <T extends keyof typeof CSS_PROPERTY>(prop: T) => CSS_VARIABLES[CSS_PROPERTY[prop]];
