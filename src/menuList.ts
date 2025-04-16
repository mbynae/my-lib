import { IconProps } from './tailwind-components/icon/icon-type';

type MenuList = {
    path: string;
    title: string;
    icon: IconProps['icon'];
    children: { link: string; subTitle: string; description: string }[];
}[];

export const menuList: MenuList = [
    {
        path: 'view-transition',
        title: 'View Transition',
        icon: 'transition',
        children: [
            { link: 'cross-fade', subTitle: 'Cross-Fade Transition', description: 'Cross-Fade Page Transition' },
            { link: 'dynamic-card', subTitle: 'Dynamic Card Transition', description: 'Dynamic Card Row Transition' },
            { link: 'zoom-in-out', subTitle: 'Zoom-in-out Transition', description: 'Zoom-in-out Image to Page Transition' },
        ],
    },
    {
        path: 'carousel',
        title: 'Carousel Animation',
        icon: 'carousel',
        children: [],
    },
    {
        path: 'dialog',
        title: 'Dialog',
        icon: 'dialog',
        children: [
            { link: 'showModal', subTitle: 'Show Modal Dialog', description: 'Default Show Modal Dialog' },
            { link: 'alert', subTitle: 'Alert Dialog', description: 'Common Management Alert Dialog' },
            { link: 'mobile', subTitle: 'Mobile Dialog', description: 'Mobile Screen Transition Dialog' },
            { link: 'popover', subTitle: 'Popover Api', description: 'Popover Api Transition' },
        ],
    },
];
