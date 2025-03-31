import { Link, useLocation } from 'react-router';
import Icon from '../../../../tailwind-components/icon/Icon';
import { useBooleanHandler, useInputHandler } from '../../../../hooks/useInputHandler';
import { CSSProperties, useEffect, useState } from 'react';
import { classNames } from '../../../../function/className';
import { IconProps } from '../../../../tailwind-components/icon/icon-type';

const Menu = () => {
    const location = useLocation();

    const pathArr = location.pathname.split('/');
    const mainMenu = pathArr?.[1];
    const subMenu = pathArr?.[2];

    const [toggle, setToggle] = useState(mainMenu);

    const onToggleMenu = (menu: string) => {
        if (toggle === menu) {
            return setToggle('');
        }
        setToggle(menu);
    };

    useEffect(() => {
        if (location.pathname === '/') {
            setToggle('');
        }
    }, [location.pathname]);

    return (
        <nav>
            <List name="view-transition" title="View Transition" toggle={toggle} icon="transition" setToggle={onToggleMenu}>
                <LinkButton parent="view-transition" link="cross-fade" subMenu={subMenu}>
                    Cross-Fade Page Transition
                </LinkButton>
                <LinkButton parent="view-transition" link="dynamic-card" subMenu={subMenu}>
                    Dynamic Card Row Transition
                </LinkButton>
                <LinkButton parent="view-transition" link="zoom-in-out" subMenu={subMenu}>
                    Zoom-in-out Image to Page Transition
                </LinkButton>
            </List>
            <List name="carousel" title="Carousel Animation" icon="cart" toggle={toggle} setToggle={onToggleMenu}></List>
        </nav>
    );
};

interface ListProps {
    children?: React.ReactNode;
    name: string;
    title: string;
    toggle: string;
    icon: IconProps['icon'];
    setToggle: (e: string) => void;
}
const List = ({ name, children, title, toggle, icon, setToggle }: ListProps) => {
    const focusStyle = 'bg-theme-main text-white  py-3.5 rounded-[10px]';

    return (
        <ul className="group mb-5">
            <li
                className={classNames('flex cursor-pointer items-center gap-2 px-4 font-medium', toggle === name ? focusStyle : '')}
                onClick={() => setToggle(name)}
            >
                <Icon icon={icon} width={24} color={toggle === name ? '#fff' : 'var(--color-border-main)'} /> {title}
            </li>
            {toggle === name && children}
        </ul>
    );
};

interface LinkProps {
    children: React.ReactNode;
    parent: string;
    link: string;
    subMenu?: string;
}
const LinkButton = ({ children, parent, link, subMenu }: LinkProps) => {
    const className = 'font-bold text-theme-main';
    return (
        <Link
            to={'/' + parent + '/' + link}
            className={classNames('text-text-thin mb-2 block pl-4 text-sm first-of-type:mt-2.5', subMenu === link ? className : '')}
        >
            {children}
        </Link>
    );
};

export default Menu;
